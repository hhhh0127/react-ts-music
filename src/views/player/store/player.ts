import { IRootState } from '@/store'
import { addPlaylistId } from '@/utils/localstorage'
import { ILyric, parseLyric } from '@/utils/parse-lyric'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getSimiPlaylist,
  getSimiSongs,
  getSongDetail,
  getSongLyric
} from '../service/player'

interface IThunkState {
  state: IRootState
}

// createAsyncThunk <函数返回值类型，参数类型>
export const fetchCurrentSongAction = createAsyncThunk<
  void,
  number,
  { state: IRootState } // 解决getState()为unknown的另外一种方法
>('currentSong', (id, { dispatch, getState }) => {
  /* 准备播放某一首歌曲时，分成两种情况 */
  // 1.从列表尝试是否可以获取到这首歌曲
  // const playSongList = (getState() as any).player.playSongList 这是一种解决getState()为unknown的解决方案
  const playSongList = getState().player.playSongList
  const findIndex = playSongList.findIndex((item) => item.id === id)
  if (findIndex === -1) {
    // 列表中未找到歌曲
    // 1.获取歌曲信息
    getSongDetail(id).then((res) => {
      // 歌曲ID添加到本地存储
      addPlaylistId(id)
      // 1.1 获取song
      if (!res.songs.length) return
      const song = res.songs[0]
      // 1.2 将song放到currentSong中
      dispatch(changeCurrentSongAction(song))
      // 1.3 将song加入播放列表中
      //（注意列表需要先浅拷贝，然后加入新的歌曲，然后存储整个新的列表，不支持部分更新，也就是不支持只把song加入，这样是song覆盖整个列表了）
      const newPlaySongList = [...playSongList]
      newPlaySongList.push(song)
      dispatch(changePlaySongListAction(newPlaySongList))
      dispatch(changePlaySongIndexAction(newPlaySongList.length - 1)) // 新歌曲在播放列表的最后位置
    })
  } else {
    // 找到
    const song = playSongList[findIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(findIndex)) // 记录歌曲在列表中的索引
  }

  // 2.获取歌词数据（获取歌词数据的同时，也把歌词数据获取到）
  // getSongLyric(id).then((res) => {
  //   // 2.1 获取歌词的字符串
  //   const lyricString = res.lrc.lyric
  //   // 2.2 对歌词进行解析 字符串 -> 一个一个的对象 [{time :xxx, content: xxx}]
  //   const lyrics = parseLyric(lyricString)
  //   dispatch(changeLyricsAction(lyrics))
  // })
  dispatch(fetchSongLyricAction(id))
})

/* 切换音乐 */
export const changeMusicAction = createAsyncThunk<void, boolean, IThunkState>(
  'changemusic',
  (isNext, { dispatch, getState }) => {
    // 1.获取新歌曲的索引
    const player = getState().player
    const playMode = player.playMode
    const songIndex = player.playSongIndex
    const songList = player.playSongList

    // 2.根据不同的模式计算不同的下一首歌曲的索引
    let newIndex = songIndex
    if (playMode === 1) {
      // 随机播放
      newIndex = Math.floor(Math.random() * songList.length)
    } else {
      // 单曲循环（切换（上）下一首也是会切换的）和顺序播放
      newIndex = isNext ? songIndex + 1 : songIndex - 1
      // 越界判断
      if (newIndex > songList.length - 1) newIndex = 0
      if (newIndex < 0) newIndex = songList.length - 1
    }
    // 3.获取当前的歌曲
    const song = songList[newIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(newIndex))

    // 4.请求新的歌词（这部分可以抽出来作为一个action）
    // getSongLyric(song.id).then((res) => {
    //   // 2.1 获取歌词的字符串
    //   const lyricString = res.lrc.lyric
    //   // 2.2 对歌词进行解析 字符串 -> 一个一个的对象 [{time :xxx, content: xxx}]
    //   const lyrics = parseLyric(lyricString)
    //   dispatch(changeLyricsAction(lyrics))
    // })
    dispatch(fetchSongLyricAction(song.id)) // 只要是action就要dispatch
  }
)

export const fetchSongLyricAction = createAsyncThunk(
  'fetchSongLyricAction',
  (id: number, { dispatch }) => {
    getSongLyric(id).then((res) => {
      // 2.1 获取歌词的字符串
      const lyricString = res.lrc.lyric
      // 2.2 对歌词进行解析 字符串 -> 一个一个的对象 [{time :xxx, content: xxx}]
      const lyrics = parseLyric(lyricString)
      dispatch(changeLyricsAction(lyrics))
    })
  }
)

export const fetchSimiPlayListAction = createAsyncThunk<
  void,
  void,
  IThunkState
>('fetchSimiPlayListAction', (args, { dispatch, getState }) => {
  const id = getState().player.currentSong.id
  getSimiPlaylist(id).then((res) => {
    dispatch(changeSimiPlayListAction(res.playlists))
  })
})

export const fetchSimiSongsAction = createAsyncThunk<void, void, IThunkState>(
  'fetchSimiSongsAction',
  (args, { dispatch, getState }) => {
    const id = getState().player.currentSong.id
    getSimiSongs(id).then((res) => {
      dispatch(changeSimiSongsAction(res.songs))
    })
  }
)

/* 
  场景：当我们拿到歌曲列表数组id的时候，循环遍历发送网络请求
  问题：如何控制一次网络请求成功之后再进行下一次网络请求（获取异步操作的结果）
  解决方案：promise + setInterval
  （3）可能有人会问，为什么使用定时器呢？
  （4）这是因为在咱们发送ajax时，不能很好的进行控制，使用一个标识变量来进行控制ajax是否发送（默认为true）
  （5）在每次开始定时器时，首先判断标识变量是否为true如果为true就发送ajax，
      在本次请求ajax时设置标识变量为false（即在定时器中不会再发送网络请求），在本次ajax完成时（即异步操作成功时），改变标识变量为true
      这样就能进行很好的控制，简单的总结一下：就是必须控制本次ajax发送请求成功时，才能进行下一次ajax
      （核心在于使用标识变量，来控制ajax请求，且只有上次ajax请求成功，才能进行下一次ajax）
*/

// 根据本地存储中的歌曲列表去请求信息
// 歌曲详情（只有首次加载的时候才会触发这个action，所以不redux中的playlist肯定不存在歌曲）
export const fetchFirstSongDetailArrayAction = createAsyncThunk(
  'fetchFirstSongDetailArrayAction',
  (args: { listId: []; index: number }, { dispatch }) => {
    const { listId } = args
    // const playList = (getState() as any).player.playList || []
    const playList: any[] = []
    console.log('+++', playList)
    console.log(listId)

    /* 串行发送请求，后一个状态依赖于前一个请求的状态 */
    const forAsync = async (arr: []) => {
      for (let index = 0; index < arr.length; index++) {
        await new Promise((resolve) => {
          const idx = arr[index]
          getSongDetail(idx).then((res) => {
            // console.log('res', res)
            const song = res.songs && res.songs[0]
            // console.log(song)
            if (!song) return
            // (1)添加到播放列表中
            playList.push(song)
            resolve(playList)
          })
        })
        // dispatch(changePlayListAction(playList))
      }
    }

    forAsync(listId)

    setTimeout(() => {
      console.log(playList)
      dispatch(changePlaySongListAction(playList))
      // (2)更改当前播放的索引
      // const songIndex = index ?? playList.length - 1
      dispatch(changePlaySongIndexAction(0))
      // (3)更改当前播放歌曲
      const currentIndexSong = playList[0]
      // console.log(currentIndexSong)
      dispatch(changeCurrentSongAction(currentIndexSong))
      // (4)请求歌曲的歌词
      dispatch(changeLyricsAction(playList[0]))
    }, 1000)

    // 这种做法没法保证顺序一致，是错乱的，无法保持串行
    // let i = 0
    // let timer: any = null
    // let excuteRun = true

    // timer = setInterval(() => {
    //   const idx = listId[i]
    //   new Promise((resolve) => {
    //     console.log(excuteRun)
    //     excuteRun &&
    //       getSongDetail(idx).then((res) => {
    //         console.log('res', res)
    //         excuteRun = false
    //         // console.log(res.songs[0])
    //         // (0)歌曲ID添加到本地存储
    //         // addPlaylistId(idx)
    //         const song = res.songs && res.songs[0]
    //         // console.log(song)
    //         if (!song) return
    //         // (1)添加到播放列表中

    //         playList.push(song)

    //         // 需要使用定时器将任务加入宏队列 意味着等着异步微任务都执行完再执行
    //         setTimeout(() => {
    //           dispatch(changePlaySongListAction(playList))
    //           // (2)更改当前播放的索引
    //           // const songIndex = index ?? playList.length - 1
    //           dispatch(changePlaySongIndexAction(0))
    //           // (3)更改当前播放歌曲
    //           const currentIndexSong = playList[0] || song
    //           // console.log(currentIndexSong)
    //           dispatch(changeCurrentSongAction(currentIndexSong))
    //           // (4)请求歌曲的歌词
    //           dispatch(changeLyricsAction(idx))
    //         }, 1000)
    //         resolve(i)
    //       })
    //   }).then(() => {
    //     excuteRun = true
    //     // console.log(value)
    //   })
    //   i++
    //   console.log(i)
    //   if (i >= listId.length) {
    //     clearInterval(timer)
    //   }
    // })
  }
)

// export const fetchSongDetailAction = createAsyncThunk(
//   'fetchSongDetailAction',
//   (id: number, {dispatch}) => {
//     getSongDetail(id).then()
//   }
// )

/* 定义类型 */
interface IPlayerState {
  currentSong: any // 当前歌曲
  lyrics: ILyric[] // 当前歌曲的歌词
  lyricIndex: number // 当前匹配的歌词下标（播放到第几句歌词）
  playSongList: any[] // 播放列表
  playSongIndex: number // 播放列表中正在播放的歌曲的下标
  playMode: number // 播放模式（当前的播放模式）
  audioTime: number // audio的播放时间 毫秒
  simiPlayList: any[] // 相似歌单
  simiSongs: any[] // 相似歌曲
}

/* 这里可以使用localStore来存储最新听的一首歌作为进入的初始值 */
const initialState: IPlayerState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1, // 初始没有歌词
  // {
  //   name: '一起走过的日子 (Live)',
  //   id: 29723028,
  //   pst: 0,
  //   t: 0,
  //   ar: [
  //     {
  //       id: 3691,
  //       name: '刘德华',
  //       tns: [],
  //       alias: []
  //     }
  //   ],
  //   alia: ['电影《至尊无上Ⅱ之永霸天下》主题曲'],
  //   pop: 100,
  //   st: 0,
  //   rt: null,
  //   fee: 8,
  //   v: 19,
  //   crbt: null,
  //   cf: '',
  //   al: {
  //     id: 3066282,
  //     name: 'Wonderful World 香港演唱会 2007',
  //     picUrl:
  //       'https://p1.music.126.net/SqEjzkbOeTocASevCOQ5Sw==/109951165909154050.jpg',
  //     tns: [],
  //     pic_str: '109951165909154050',
  //     pic: 109951165909154050
  //   },
  //   dt: 237000,
  //   h: {
  //     br: 320000,
  //     fid: 0,
  //     size: 9521153,
  //     vd: 14620,
  //     sr: 44100
  //   },
  //   m: {
  //     br: 192000,
  //     fid: 0,
  //     size: 5712709,
  //     vd: 17191,
  //     sr: 44100
  //   },
  //   l: {
  //     br: 128000,
  //     fid: 0,
  //     size: 3808487,
  //     vd: 18817,
  //     sr: 44100
  //   },
  //   sq: null,
  //   hr: null,
  //   a: null,
  //   cd: '1',
  //   no: 16,
  //   rtUrl: null,
  //   ftype: 0,
  //   rtUrls: [],
  //   djId: 0,
  //   copyright: 2,
  //   s_id: 0,
  //   mark: 17179877376,
  //   originCoverType: 1,
  //   originSongSimpleData: null,
  //   tagPicList: null,
  //   resourceState: true,
  //   version: 19,
  //   songJumpInfo: null,
  //   entertainmentTags: null,
  //   awardTags: null,
  //   single: 0,
  //   noCopyrightRcmd: null,
  //   rtype: 0,
  //   rurl: null,
  //   mst: 9,
  //   cp: 0,
  //   mv: 0,
  //   publishTime: 1201795200007
  // },
  // {
  //   name: '温柔 (Live)',
  //   id: 2005487403,
  //   pst: 0,
  //   t: 0,
  //   ar: [
  //     {
  //       id: 13193,
  //       name: '五月天',
  //       tns: [],
  //       alias: []
  //     }
  //   ],
  //   alia: [],
  //   pop: 85,
  //   st: 0,
  //   rt: '',
  //   fee: 8,
  //   v: 11,
  //   crbt: null,
  //   cf: '',
  //   al: {
  //     id: 156294876,
  //     name: '五月天 创造 小巨蛋 D.N.A LIVE 创记录音',
  //     picUrl:
  //       'https://p2.music.126.net/J2WDquZu0JzMu3CKE59fVQ==/109951168163594976.jpg',
  //     tns: [],
  //     pic_str: '109951168163594976',
  //     pic: 109951168163594980
  //   },
  //   dt: 525960,
  //   h: {
  //     br: 320000,
  //     fid: 0,
  //     size: 21041154,
  //     vd: -66132,
  //     sr: 44100
  //   },
  //   m: {
  //     br: 192000,
  //     fid: 0,
  //     size: 12624710,
  //     vd: -63647,
  //     sr: 44100
  //   },
  //   l: {
  //     br: 128000,
  //     fid: 0,
  //     size: 8416488,
  //     vd: -62225,
  //     sr: 44100
  //   },
  //   sq: {
  //     br: 911126,
  //     fid: 0,
  //     size: 59901986,
  //     vd: -66058,
  //     sr: 44100
  //   },
  //   hr: null,
  //   a: null,
  //   cd: '01',
  //   no: 24,
  //   rtUrl: null,
  //   ftype: 0,
  //   rtUrls: [],
  //   djId: 0,
  //   copyright: 0,
  //   s_id: 0,
  //   mark: 17179877376,
  //   originCoverType: 0,
  //   originSongSimpleData: null,
  //   tagPicList: null,
  //   resourceState: true,
  //   version: 11,
  //   songJumpInfo: null,
  //   entertainmentTags: null,
  //   awardTags: null,
  //   single: 0,
  //   noCopyrightRcmd: null,
  //   mst: 9,
  //   cp: 0,
  //   rtype: 0,
  //   rurl: null,
  //   mv: 0,
  //   publishTime: 1259856000000
  // },
  // {
  //   name: '在这个年纪也许不配拥有爱情',
  //   id: 1488077114,
  //   pst: 0,
  //   t: 0,
  //   ar: [
  //     {
  //       id: 33913095,
  //       name: 'KIND',
  //       tns: [],
  //       alias: []
  //     }
  //   ],
  //   alia: [],
  //   pop: 100,
  //   st: 0,
  //   rt: '',
  //   fee: 8,
  //   v: 17,
  //   crbt: null,
  //   cf: '',
  //   al: {
  //     id: 96935136,
  //     name: '在這個年紀也許不配擁有愛情',
  //     picUrl:
  //       'https://p2.music.126.net/9iUofnl-0xzaEOSx3PCOUA==/109951165398822871.jpg',
  //     tns: [],
  //     pic_str: '109951165398822871',
  //     pic: 109951165398822860
  //   },
  //   dt: 209064,
  //   h: {
  //     br: 320002,
  //     fid: 0,
  //     size: 8365497,
  //     vd: 14409,
  //     sr: 44100
  //   },
  //   m: {
  //     br: 192002,
  //     fid: 0,
  //     size: 5019315,
  //     vd: 17010,
  //     sr: 44100
  //   },
  //   l: {
  //     br: 128002,
  //     fid: 0,
  //     size: 3346225,
  //     vd: 18692,
  //     sr: 44100
  //   },
  //   sq: {
  //     br: 1512187,
  //     fid: 0,
  //     size: 39518113,
  //     vd: 14413,
  //     sr: 44100
  //   },
  //   hr: null,
  //   a: null,
  //   cd: '01',
  //   no: 1,
  //   rtUrl: null,
  //   ftype: 0,
  //   rtUrls: [],
  //   djId: 0,
  //   copyright: 0,
  //   s_id: 0,
  //   mark: 17179877440,
  //   originCoverType: 0,
  //   originSongSimpleData: null,
  //   tagPicList: null,
  //   resourceState: true,
  //   version: 17,
  //   songJumpInfo: null,
  //   entertainmentTags: null,
  //   awardTags: null,
  //   single: 0,
  //   noCopyrightRcmd: null,
  //   rtype: 0,
  //   rurl: null,
  //   mst: 9,
  //   cp: 0,
  //   mv: 0,
  //   publishTime: 0
  // }
  playSongList: [],
  playSongIndex: -1,
  playMode: 0, // 0：顺序播放 1：随机播放 2：单曲循环
  audioTime: 0,
  simiPlayList: [],
  simiSongs: []
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    },
    changePlaySongIndexAction(state, { payload }) {
      state.playSongIndex = payload
    },
    changePlaySongListAction(state, { payload }) {
      state.playSongList = payload
    },
    changePlayModeAction(state, { payload }) {
      state.playMode = payload
    },
    changeAudioTimeAction(state, { payload }) {
      state.audioTime = payload
    },
    changeSimiPlayListAction(state, { payload }) {
      state.simiPlayList = payload
    },
    changeSimiSongsAction(state, { payload }) {
      state.simiSongs = payload
    }
  }
})

export const {
  changeCurrentSongAction,
  changeLyricsAction,
  changeLyricIndexAction,
  changePlaySongIndexAction,
  changePlaySongListAction,
  changePlayModeAction,
  changeAudioTimeAction,
  changeSimiPlayListAction,
  changeSimiSongsAction
} = playerSlice.actions
/* 生效需要在全局的store中注册 */
export default playerSlice.reducer

import { ILyric, parseLyric } from '@/utils/parse-lyric'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '../service/player'

export const fetchCurrentSongAction = createAsyncThunk(
  'currentSong',
  (id: number, { dispatch }) => {
    // 1.获取歌曲信息
    getSongDetail(id).then((res) => {
      // 1.1 获取song
      if (!res.songs.length) return
      const song = res.songs[0]
      // 1.2 将song放到currentSong中
      dispatch(changeCurrentSongAction(song))
    })

    // 2.获取歌词数据（获取歌词数据的同时，也把歌词数据获取到）
    getSongLyric(id).then((res) => {
      // 2.1 获取歌词的字符串
      const lyricString = res.lrc.lyric
      // 2.2 对歌词进行解析 字符串 -> 一个一个的对象 [{time :xxx, content: xxx}]
      const lyrics = parseLyric(lyricString)
      dispatch(changeLyricsAction(lyrics))
    })
  }
)

/* 定义类型 */
interface IPlayerState {
  currentSong: any
  lyrics: ILyric[]
  lyricIndex: number // 当前匹配的歌词下标
  playSongList: any[] // 播放列表
  playSongIndex: number // 播放列表中正在播放的歌曲的下标
}

/* 这里可以使用localStore来存储最新听的一首歌作为进入的初始值 */
const initialState: IPlayerState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1, // 初始没有歌词
  playSongList: [
    {
      name: '温柔 (Live)',
      id: 2005487403,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 13193,
          name: '五月天',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 85,
      st: 0,
      rt: '',
      fee: 8,
      v: 11,
      crbt: null,
      cf: '',
      al: {
        id: 156294876,
        name: '五月天 创造 小巨蛋 D.N.A LIVE 创记录音',
        picUrl:
          'https://p2.music.126.net/J2WDquZu0JzMu3CKE59fVQ==/109951168163594976.jpg',
        tns: [],
        pic_str: '109951168163594976',
        pic: 109951168163594980
      },
      dt: 525960,
      h: {
        br: 320000,
        fid: 0,
        size: 21041154,
        vd: -66132,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 12624710,
        vd: -63647,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 8416488,
        vd: -62225,
        sr: 44100
      },
      sq: {
        br: 911126,
        fid: 0,
        size: 59901986,
        vd: -66058,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '01',
      no: 24,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 17179877376,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 11,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      mst: 9,
      cp: 0,
      rtype: 0,
      rurl: null,
      mv: 0,
      publishTime: 1259856000000
    },
    {
      name: '在这个年纪也许不配拥有爱情',
      id: 1488077114,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 33913095,
          name: 'KIND',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '',
      fee: 8,
      v: 17,
      crbt: null,
      cf: '',
      al: {
        id: 96935136,
        name: '在這個年紀也許不配擁有愛情',
        picUrl:
          'https://p2.music.126.net/9iUofnl-0xzaEOSx3PCOUA==/109951165398822871.jpg',
        tns: [],
        pic_str: '109951165398822871',
        pic: 109951165398822860
      },
      dt: 209064,
      h: {
        br: 320002,
        fid: 0,
        size: 8365497,
        vd: 14409,
        sr: 44100
      },
      m: {
        br: 192002,
        fid: 0,
        size: 5019315,
        vd: 17010,
        sr: 44100
      },
      l: {
        br: 128002,
        fid: 0,
        size: 3346225,
        vd: 18692,
        sr: 44100
      },
      sq: {
        br: 1512187,
        fid: 0,
        size: 39518113,
        vd: 14413,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '01',
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 17179877440,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 17,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 0,
      mv: 0,
      publishTime: 0
    },
    {
      name: '一起走过的日子 (Live)',
      id: 29723028,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 3691,
          name: '刘德华',
          tns: [],
          alias: []
        }
      ],
      alia: ['电影《至尊无上Ⅱ之永霸天下》主题曲'],
      pop: 100,
      st: 0,
      rt: null,
      fee: 8,
      v: 19,
      crbt: null,
      cf: '',
      al: {
        id: 3066282,
        name: 'Wonderful World 香港演唱会 2007',
        picUrl:
          'https://p1.music.126.net/SqEjzkbOeTocASevCOQ5Sw==/109951165909154050.jpg',
        tns: [],
        pic_str: '109951165909154050',
        pic: 109951165909154050
      },
      dt: 237000,
      h: {
        br: 320000,
        fid: 0,
        size: 9521153,
        vd: 14620,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 5712709,
        vd: 17191,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 3808487,
        vd: 18817,
        sr: 44100
      },
      sq: null,
      hr: null,
      a: null,
      cd: '1',
      no: 16,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 2,
      s_id: 0,
      mark: 17179877376,
      originCoverType: 1,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 19,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 0,
      mv: 0,
      publishTime: 1201795200007
    }
  ],
  playSongIndex: -1
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
    }
  }
})

export const {
  changeCurrentSongAction,
  changeLyricsAction,
  changeLyricIndexAction
} = playerSlice.actions
/* 生效需要在全局的store中注册 */
export default playerSlice.reducer

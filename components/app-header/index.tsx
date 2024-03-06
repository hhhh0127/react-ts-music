import React, { memo, useState, useRef, useEffect, useCallback } from 'react'
import type { FC, ReactNode } from 'react'
import type { MenuProps } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import { HeaderLeft, HeaderRight, HeaderWrapper } from './style'

import { Input, Dropdown } from 'antd'
import { DownOutlined, SearchOutlined } from '@ant-design/icons'

import headerTitles from '@/assets/data/header_titles.json'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import { clearLoginState } from '@/utils/secret-key'
import { changeIsVisibleAction } from '../theme-login/store/login'
import ThemeLogin from '../theme-login'
import { debounce } from '@/utils/format'
import {
  changeFocusStateAction,
  fetchSearchSongDataAction
} from './store/search'
import { fetchCurrentSongAction } from '@/views/player/store/player'

interface IProps {
  children?: ReactNode
}

const AppHeader: FC<IProps> = () => {
  /* 定义组件内部的状态 */
  const [isRedirect, setIsRedirect] = useState(false)
  const [value, setValue] = useState('')
  const [recordActive, setRecordActive] = useState(-1)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isLogin, profile, focusState, searchSongList } = useAppSelector(
    (state) => ({
      isLogin: state.login.isLogin,
      profile: state.login.profile,
      focusState: state.search.focusState,
      searchSongList: state.search.searchSongList
    }),
    shallowEqualApp
  )

  const inputRef = useRef<any>()
  // 根据当前焦点状态设置input焦点
  useEffect(() => {
    // 获取焦点
    if (focusState) inputRef?.current?.focus()
    // 失去焦点
    else inputRef?.current.blur()
  }, [focusState])

  // 函数防抖进行优化
  const changeInput = debounce((target: any) => {
    const searchStr = target.value.trim()
    if (searchStr.length < 1) return
    // 显示下拉框
    dispatch(changeFocusStateAction(true))
    // 发送网络请求
    dispatch(fetchSearchSongDataAction(searchStr))
  }, 400)

  // 点击当前item歌曲项
  const changeCurrentSong = (id: number, item: any) => {
    // 放到搜索文本框
    setValue(item.value + '-' + item.artists[0].name)
    dispatch(fetchCurrentSongAction(id))
    // 隐藏下拉框
    dispatch(changeFocusStateAction(false))
    // 播放音乐
    // document?.getElementById('audio')?.autoplay = true
  }

  // 回车跳转到搜索详情
  const handleEnter = useCallback(() => {
    // 说明当前光标有”高亮当前行“
    if (recordActive >= 0) {
      // 保存value
      setValue(
        searchSongList[recordActive].name +
          '-' +
          searchSongList[recordActive].artists[0].name
      )
    }
    dispatch(changeFocusStateAction(false))
    // 只要在搜索框回车: 都进行跳转
    setIsRedirect(true)
  }, [dispatch, recordActive, searchSongList])

  // 获取焦点
  const handleFocus = useCallback(() => {
    // 当文本获取焦点时,文本被选中状态
    inputRef.current.select()
    // 更改为获取焦点状态
    dispatch(changeFocusStateAction(true))
    // 修改状态重定向状态
    setIsRedirect(false)
  }, [dispatch])

  // 监控用户是否按: "上"或"下"键
  const watchKeyboard = useCallback(
    (even: any) => {
      let activeNumber = recordActive
      if (even.keyCode === 38) {
        activeNumber--
        activeNumber =
          activeNumber < 0 ? searchSongList?.length - 1 : activeNumber
        setRecordActive(activeNumber)
      } else if (even.keyCode === 40) {
        activeNumber++
        activeNumber = activeNumber >= searchSongList?.length ? 0 : activeNumber
        setRecordActive(activeNumber)
      }
    },
    [recordActive, setRecordActive, searchSongList]
  )

  // icons键盘图标
  // const icons = (
  //   <div className="icons-wrapper">
  //     <div className="ctrl-wrapper">
  //       <svg width="15" height="15" className="DocSearch-Control-Key-Icon">
  //         <path
  //           d="M4.505 4.496h2M5.505 5.496v5M8.216 4.496l.055 5.993M10 7.5c.333.333.5.667.5 1v2M12.326 4.5v5.996M8.384 4.496c1.674 0 2.116 0 2.116 1.5s-.442 1.5-2.116 1.5M3.205 9.303c-.09.448-.277 1.21-1.241 1.203C1 10.5.5 9.513.5 8V7c0-1.57.5-2.5 1.464-2.494.964.006 1.134.598 1.24 1.342M12.553 10.5h1.953"
  //           strokeWidth="1.2"
  //           stroke="currentColor"
  //           fill="none"
  //           strokeLinecap="square"
  //         ></path>
  //       </svg>
  //     </div>
  //     <div className="k-wrapper">k</div>
  //   </div>
  // )

  /* 组件的展示逻辑 */
  /* 因为有的是跳转，有的是超链接，需要根据类型不同做处理 */
  function showItem(item: any) {
    if (item.type === 'path') {
      // NavLink比Link会多添加一个属性 active
      return (
        <NavLink
          to={item.link}
          className={({ isActive }) => {
            return isActive ? 'active' : undefined
          }}
        >
          {item.title}
          <i className="icon sprite_01"></i>
        </NavLink>
      )
    } else {
      return (
        // target="_blank" 单独打开一个页面
        <a href={item.link} target="_blank" rel="noreferrer">
          {item.title}
        </a>
      )
    }
  }

  // 用户下拉JSX：使用组件 Dropdown
  const items: MenuProps['items'] = isLogin
    ? [
        {
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="#/"
              onClick={(e) => e.preventDefault()}
            >
              {profile?.nickname}
            </a>
          ),
          key: '1'
        },
        {
          label: (
            <a rel="noopener noreferrer" href="#/user">
              我的主页
            </a>
          ),
          key: '2'
        },
        {
          label: <span>退出登录</span>,
          key: '3'
        }
      ]
    : []

  // Dropdown 中的关联事件：根据key来
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      console.log('1')
    } else if (key === '2') {
      console.log('2')
    } else if (key === '3') {
      clearLoginState()
    }
  }

  const showProfileContent = () => {
    return (
      <img src={profile?.avatarUrl} alt="" className="profile-img" />
      // <div>
      //   <img src={profile.avatarUrl} alt="" className="profile-img" />
      //   {/* <span>{profile.nickname}</span> */}
      // </div>
    )
  }

  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          {/* logo设置 */}
          <a className="logo sprite_01" href="/#">
            网易云音乐
          </a>
          <div className="title-list">
            {headerTitles.map((item) => {
              return (
                // active 用于编写选中的状态
                <div className="item active" key={item.title}>
                  {showItem(item)}
                </div>
              )
            })}
          </div>
        </HeaderLeft>
        <HeaderRight>
          {/* input使用antd组件库 */}
          <div className="input">
            <>
              <Input
                ref={inputRef}
                className="search"
                placeholder="音乐/视频/电台/用户"
                prefix={<SearchOutlined />}
                // onChange={(e) => setIsRedirect(false) || setValue(e.target.value)}
                onChange={(e) => {
                  setIsRedirect(false), setValue(e.target.value)
                }} // 输入框内容变化时的回调
                onInput={({ target }) => changeInput(target)}
                onFocus={handleFocus}
                onPressEnter={() => handleEnter()}
                value={value}
                onKeyDown={watchKeyboard}
                // suffix={icons} // 带有后缀图标的 input
              />
              {isRedirect && navigate(`/search/single?song=${value}&type=1`)}
              <div
                className="down-slider"
                style={{ display: focusState ? 'block' : 'none' }}
              >
                <div className="search-header">
                  <span className="discover">
                    搜&quot;歌曲&quot;相关用户&gt;
                  </span>
                </div>

                <div className="content">
                  <div className="zuo">
                    <span className="song">单曲</span>
                  </div>

                  {/* <div className="you"> */}
                  <span className="main">
                    {searchSongList &&
                      searchSongList.map((item: any, index: number) => {
                        return (
                          <div
                            className={
                              'item ' + (recordActive === index ? 'active' : '')
                            }
                            key={item.id}
                            onClick={() => changeCurrentSong(item.id, item)}
                          >
                            <span>{item.name}</span>-{item.artists[0].name}
                          </div>
                        )
                      })}
                  </span>
                </div>
              </div>
            </>
          </div>
          <span className="center">创作者中心</span>
          <Dropdown menu={{ items, onClick: handleMenuClick }}>
            <div
              className="login"
              onClick={() => !isLogin && dispatch(changeIsVisibleAction(true))}
            >
              {/* {isLogin ? profile.nickname : '登录'} */}
              <a
                href="https://juejin.cn/user/606586151899166"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {isLogin ? showProfileContent() : '登录'} <DownOutlined />
              </a>
            </div>
          </Dropdown>

          {/* <span className="login">登陆</span> */}
        </HeaderRight>
      </div>
      {/* 分割线 */}
      <div className="divider"></div>
      <ThemeLogin />
    </HeaderWrapper>
  )
}

export default memo(AppHeader)

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { gotoPhoneLogin } from '../service/login'
//js使用
// import md5 from 'js-md5';

//ts使用
import { Md5 } from 'ts-md5'

//js使用
// var key = md5('hello');
// console.log("加密后："key) //加密后：5d41402abc4b2a76b9719d911017c592

// //ts使用
// var key = Md5.hashStr('hello');
// console.log("加密后："key) //加密后：5d41402abc4b2a76b9719d911017c592

import { message } from 'antd'
import loginInfo from '@/config/token'
import { getLoginInfo, setLoginInfo } from '@/utils/secret-key'

interface ILoginState {
  isVisible?: boolean
  isLogin?: boolean // 登录状态
  profile?: any
  token?: string
  cookie?: string
}

const initialState: ILoginState = {
  isVisible: false,
  isLogin: false, // 登录状态
  profile: '',
  token: '',
  cookie: ''
}

interface IMytype {
  username: string
  password: string
  tip?: boolean
}
// 获取登陆信息
export const fetchLoginProfileInfoAction = createAsyncThunk(
  'fetchLoginProfileInfoAction',
  (args: IMytype, { dispatch }) => {
    gotoPhoneLogin(args.username, undefined, Md5.hashStr(args.password)).then(
      (res) => {
        if (res.code !== 200) {
          message.error('账号或密码错误')
        } else {
          args.tip && message.success('登录成功')
          // 登陆成功
          document.cookie = res.cookie
          // 保存登陆信息
          dispatch(changeUserProfileInfoAction(res && res.profile))
          // 更改登陆状态
          dispatch(changeIsLoginAction(true))
          dispatch(changeTokenAction(res.token))
          dispatch(changeCookieAction(res.cookie))
          // 更改登陆状态
          loginInfo.username = args.username
          loginInfo.password = args.password
          loginInfo.state = true
          const newLoginInfo = Object.assign(
            getLoginInfo('loginInfo'),
            loginInfo
          )
          setLoginInfo('loginInfo', newLoginInfo)
          // 关闭模态框
          dispatch(changeIsVisibleAction(false))
        }
      }
    )
  }
)

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // 更改登录框显示
    changeIsVisibleAction(state, { payload }) {
      state.isVisible = payload
    },
    // 更改登录状态
    changeIsLoginAction(state, { payload }) {
      state.isLogin = payload
    },
    // 更改登录用户信息
    changeUserProfileInfoAction(state, { payload }) {
      state.profile = payload
    },
    // 更改登录状态(token)
    changeTokenAction(state, { payload }) {
      state.token = payload
    },
    // 更改登录状态(cookie)
    changeCookieAction(state, { payload }) {
      state.cookie = payload
    }
  }
})

export const {
  changeIsVisibleAction,
  changeIsLoginAction,
  changeUserProfileInfoAction,
  changeTokenAction,
  changeCookieAction
} = loginSlice.actions

export default loginSlice.reducer

import React, { memo, useState, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { LoginLeft, LoginRight, LoginWrapper, PhoneLoginModal } from './style'
import { Button, message, Modal } from 'antd'
import { PhoneOutlined } from '@ant-design/icons'
import { LoginIcon } from '../theme-controls-icon'
import ThemeLoginForm from '../theme-login-form'
import Draggable from 'react-draggable'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import { changeIsVisibleAction } from './store/login'

interface IProps {
  children?: ReactNode
}
/* 登陆页面（模态框）Model组件 */
const ThemeLogin: FC<IProps> = () => {
  // state/props
  const [disabled, setDisabled] = useState(true)
  const [loginState, setLoginState] = useState('default') // 默认状态显示
  // const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })
  const draggleRef = useRef<any>(null)

  // redux
  const dispatch = useAppDispatch()
  const { isVisible } = useAppSelector(
    (state) => ({
      isVisible: state.login.isVisible
    }),
    shallowEqualApp
  )

  // 取消
  const handleCancel = () => {
    // 关闭模态框
    dispatch(changeIsVisibleAction(false))
    // 延迟返回初始化状态
    setTimeout(() => {
      setLoginState('default')
    }, 100)
  }
  // 拖拽
  // const onStart = (uiData: any) => {
  //   console.log('---->拖拽')
  //   const { clientWidth, clientHeight } = window?.document?.documentElement
  //   const targetRect = draggleRef?.current?.getBoundingClientRect()
  //   setBounds({
  //     left: -targetRect?.left + uiData?.x,
  //     right: clientWidth - (targetRect.right - uiData?.x),
  //     top: -targetRect?.top + uiData?.y,
  //     bottom: clientHeight - (targetRect?.bottom - uiData?.y)
  //   })
  // }

  const handleLogin = (loginMode: string) => {
    switch (loginMode) {
      case 'phone':
        setLoginState('phone')
        break
      case 'email':
        setLoginState('email')
        break
      case 'register':
        setLoginState('register')
        break
      default:
    }
  }

  const defaultWrapperContent = (
    <LoginWrapper>
      <LoginLeft>
        <div className="login-content">
          <div className="login-bg"></div>
          <Button
            onClick={() => handleLogin('register')}
            shape="round"
            // 内嵌图标
            icon={<PhoneOutlined />}
            className="gap button"
          >
            注册
          </Button>
          <Button
            type="primary"
            shape="round"
            icon={<PhoneOutlined />}
            onClick={() => handleLogin('phone')}
            className="button"
          >
            手机号登录
          </Button>
        </div>
      </LoginLeft>
      <LoginRight>
        <div className="icons-wrapper">
          <LoginIcon
            onClick={() => message.warning('暂不做')}
            position="-150px -670px"
            description="微信登录"
          />
          <LoginIcon
            onClick={() => message.warning('暂不做')}
            position="-190px -670px"
            description="QQ登录"
          />
          <LoginIcon
            onClick={() => message.warning('暂不做')}
            position="-231px -670px"
            description="微博登录"
          />
          <LoginIcon
            onClick={() => handleLogin('email')}
            position="-271px -670px"
            description="网易邮箱登录"
          />
        </div>
      </LoginRight>
    </LoginWrapper>
  )

  const phoneLogin = (loginState: string) => {
    return (
      <PhoneLoginModal>
        <ThemeLoginForm loginState={loginState} />
      </PhoneLoginModal>
    )
  }

  return (
    <Draggable>
      {/* 需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作 */}
      <Modal
        centered
        footer={null}
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move'
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false)
              }
            }}
            onMouseOut={() => {
              setDisabled(true)
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            {loginState === 'register' ? '注册' : '登录'}
          </div>
        }
        open={isVisible}
        onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            // bounds={bounds}
            // onStart={(uiData: any) => onStart(uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        {/* 登录 */}
        {loginState === 'default' ? defaultWrapperContent : null}
        {loginState === 'phone' ? phoneLogin('phone') : undefined}
        {loginState === 'email' ? phoneLogin('email') : undefined}
        {loginState === 'register' ? phoneLogin('register') : undefined}
      </Modal>
    </Draggable>
  )
}

export default memo(ThemeLogin)

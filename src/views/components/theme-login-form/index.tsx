import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { getParseLoginState, getMatchReg } from '@/utils/format'
import { useAppDispatch } from '@/store'
import { fetchLoginProfileInfoAction } from '../theme-login/store/login'
import { sendRegister, sendRegisterCode } from '../theme-login/service/login'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { LoginFormWrapper } from './style'

// (webpack中配置css加载器)
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}
const tailLayout = {
  wrapperCol: { span: 30 }
}

interface IProps {
  loginState: string
  children?: ReactNode
}

const ThemeLoginForm: FC<IProps> = (props) => {
  // 拿到"登录的方式"
  const { loginState } = props
  const [phone, setPhone] = useState('')
  const [isSendState, setIsSendState] = useState(false)
  const [second, setSecond] = useState(60)
  // 解析登录状态: phone->'手机号'  email->'邮箱'  register -> 注册
  const parseLoginModeText = getParseLoginState(loginState)
  // 表单正则: 根据不同登录方式,匹配不同的正则
  const mathchReg = getMatchReg(loginState)
  const mathchPhoneReg = getMatchReg('phone')
  const pwdReg = /[0-9a-zA-Z._-]{6,20}/
  const codeReg = /[0-9a-zA-Z._-]{4,20}/

  const dispatch = useAppDispatch()

  // 对象在ts中
  const onFinish = (args: {
    username: string
    password: string
    tip: boolean
  }) => {
    // 先固定写死: 手机号登陆
    dispatch(fetchLoginProfileInfoAction(args))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  // 注册
  const onRegisterFinish = (value: any) => {
    const { phone, password, code, nickname } = value
    sendRegister(code, phone, password, nickname).then((res) => {
      console.log('---')
      console.log(res)
      if (res.code === 200) message.success('注册成功')
      else message.warning(res.message)
    })
  }
  const onRegisterFinishFailed = () => {}

  const handleSendCode = () => {
    // 60秒延迟定时器
    if (!isSendState) {
      let i = 0
      const timer = setInterval(() => {
        i++
        setSecond(second - i)
        if (i >= 60) {
          clearInterval(timer)
          setIsSendState(false)
          setSecond(60)
        }
      }, 1000)
      // 发送验证码
      !isSendState &&
        sendRegisterCode(phone).then((res) => {
          if (res.code === 200) message.success('发送成功')
          else message.warning('发送失败, 请60秒后发送验证码')
        })
    }
    setIsSendState(true)
  }

  return (
    <LoginFormWrapper>
      <Form
        style={{
          display: loginState !== 'register' ? 'block' : 'none'
        }}
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label={parseLoginModeText}
          name="username"
          rules={[
            {
              pattern: mathchReg,
              message: `请输入正确的${parseLoginModeText}`
            },
            { required: true, message: '请输入你的账户' }
          ]}
        >
          {/* autofocus 属性规定当页面加载时 input 元素应该自动获得焦点 */}
          <Input autoFocus />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            { pattern: pwdReg, message: '密码最短6位' },
            { required: true, message: '请输入你的密码!' }
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div className="textAlignRight">
          <Checkbox className="mr80" defaultChecked={true}>
            自动登录
          </Checkbox>
          <span className="forgetPwd">忘记密码?</span>
        </div>
        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            size="middle"
            block
            shape="round"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
      <Form
        style={{
          display: loginState === 'register' ? 'block' : 'none'
        }}
        {...layout}
        name="basic"
        onFinish={onRegisterFinish}
        onFinishFailed={onRegisterFinishFailed}
      >
        <Form.Item
          label={parseLoginModeText}
          name="phone"
          rules={[
            {
              pattern: mathchPhoneReg,
              message: `请输入正确的手机号`
            },
            { required: true, message: '请输入你的手机号' }
          ]}
        >
          <Input
            autoFocus
            value={phone}
            onChange={({ target }) => {
              setPhone(target.value)
            }}
          />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ pattern: pwdReg, message: '密码最短6位', required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <div className="register" onClick={() => handleSendCode()}>
            {isSendState ? second + 's' : '发送验证码'}
          </div>
        </Form.Item>
        <Form.Item
          className="gap"
          label="验证码"
          name="code"
          rules={[
            { pattern: codeReg, message: '验证码最短4位' },
            { required: true, message: '请输入你的验证码' }
          ]}
        >
          <Input disabled={!isSendState} />
        </Form.Item>
        <Form.Item
          className="gap"
          label="昵称"
          name="nickname"
          rules={[{ required: true, message: '请输入你的昵称' }]}
        >
          <Input disabled={!isSendState} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            size="middle"
            block
            shape="round"
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </LoginFormWrapper>
  )
}

export default memo(ThemeLoginForm)

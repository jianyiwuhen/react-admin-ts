// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { A_login, A_getUserInfo } from '@/store/actions'
import './login.scss'
import { ObjTy } from '@/types/common'
import { StateTy } from '@/types/store'
function Login(props: ObjTy) {
  const [loading, setLoading] = useState(false)
  const [tipMsg, setTipMsg] = useState('')
  const onFinish = (values: ObjTy) => {
    setTipMsg('')
    setLoading(true)
    props
      .A_login(values)
      .then(() => {
        message.success('登录成功')
      })
      .catch((msg: string) => {
        setTipMsg(msg)
        setLoading(false)
      })
  }
  if (props.token) {
    return <Redirect to="/dashboard" />
  }
  return (
    <div className="login-container columnCC">
      <div className="title-container">
        <h3 className="title text-center">react admin template</h3>
      </div>
      <Form
        autoComplete="off"
        className="widthPx-340"
        initialValues={{ username: 'admin', password: '123456' }}
        labelAlign={'left'}
        name="basic"
        onFinish={onFinish}
      >
        <Form.Item label="" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>

        {/*error tip*/}
        <div className="tip-message mrPx-4">{tipMsg}</div>
        <Button className="login-btn" htmlType="submit" loading={loading} type="primary">
          登 录
        </Button>
      </Form>
    </div>
  )
}

//配置使用redux
export default connect(
  (state: StateTy) => ({
    ...state.user
  }),
  { A_login, A_getUserInfo }
)(Login)

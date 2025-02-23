// eslint-disable-next-line no-use-before-define
import React from 'react'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Dropdown, Menu, message } from 'antd'
import './Navbar.scss'
import Hamburger from '../Hamburger'
import Breadcrumb from '../Breadcrumb'
import { CaretDownOutlined } from '@ant-design/icons'
import { A_logout } from '@/store/actions'
import { ObjTy } from '@/types/common'
import { StateTy } from '@/types/store'
function Navbar(props: ObjTy) {
  const dispatch = useDispatch()
  const toggleSideBar = () => {
    dispatch({ type: 'R_app_sidebar_opened', data: !props.opened })
  }
  //退出登录
  const loginOut = () => {
    dispatch(props.A_logout).then(() => {
      message.success('退出登录成功')
    })
  }
  const menu = () => (
    <Menu>
      <Menu.Item key="0">
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="https://github.com/jzfai/react-admin-template" target="_blank">
          Github
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="https://github.com/jzfai/react-admin-template" target="_blank">
          Docs
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={loginOut}>
        login out
      </Menu.Item>
    </Menu>
  )
  return (
    <div className="navbar rowBC">
      <div className="rowSC">
        <Hamburger isActive toggleSideBar={toggleSideBar} />
        <Breadcrumb />
      </div>
      {/* 下拉退出登录*/}
      <div className="mr-1">
        <Dropdown className="rowSE" overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link avatar-wrapper" onClick={(e) => e.preventDefault()}>
            <img
              className="user-avatar"
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
            />{' '}
            <CaretDownOutlined className="mlPx-6 font-sizePx12" style={{ color: '#000' }} />
          </a>
        </Dropdown>
      </div>
    </div>
  )
}

//配置使用redux
export default connect(
  (state: StateTy) => ({
    opened: state.app.sidebar.opened
  }),
  { A_logout }
)(Navbar)

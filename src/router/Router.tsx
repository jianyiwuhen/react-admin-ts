// eslint-disable-next-line no-use-before-define
import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { A_getUserInfo } from '@/store/actions/user'
import Layout from '@/layout'
import Login from '@/views/login'
import { ObjTy } from '@/types/common'
import { StateTy } from '@/types/store'
function Router(props: ObjTy) {
  const { token, A_getUserInfo } = props
  return (
    <HashRouter>
      <Switch>
        <Route component={Login} exact path="/login" />
        <Route
          path="/"
          render={() => {
            if (!token) {
              return <Redirect to="/login" />
            } else {
              if (props.role) {
                return <Layout />
              } else {
                A_getUserInfo(token).then(() => <Layout />)
              }
            }
          }}
        />
      </Switch>
    </HashRouter>
  )
}

//配置使用redux
export default connect(
  (state: StateTy) => ({
    ...state.user
  }),
  { A_getUserInfo }
)(Router)

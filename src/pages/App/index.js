import React, {Component} from 'react'
import {renderRoutes} from 'react-router-config'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

import style from './style.styl'
import '../../assets/js/fontawesome-all.min.js'
import {jwtSecretName} from '../../../configClient'

import Header from '../../components/Header'

class App extends Component {
  state = {
    loggedIn: false
  }

  componentDidMount() {
    const {auth} = this.props
    const jwt = localStorage.getItem(jwtSecretName)
    console.log('auth---', auth)
    console.log('jwt---', jwt)
    if(jwt) this.setState({loggedIn: true})
  }

  componentWillReceiveProps(nextProps) {
    const {auth} = nextProps
    const jwt = localStorage.getItem(jwtSecretName)
    console.log('auth---', auth)
    console.log('jwt---', jwt)
    if(jwt) this.setState({loggedIn: true})
  }

  render() {
    const {route} = this.props
    const {loggedIn} = this.state
    return <div className={style.app}>
      <Header loggedIn={loggedIn} />
      <main className={style.app__main}>
        {renderRoutes(route.routes)}
      </main>
    </div>
  }
}

export default connect(state => ({
  auth: state.auth.auth
}))(App)
import React, {Component} from 'react'
import {renderRoutes} from 'react-router-config'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

import style from './style.styl'
import '../../assets/js/fontawesome-all.min.js'
import {jwtSecretName} from '../../../configClient'
import {logout} from '../../ducks/auth'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

class App extends Component {
  state = {
    token: null
  }

  componentDidMount() {
    const token = localStorage.getItem(jwtSecretName)
    if(token) this.setState({token})
  }
  
  componentWillReceiveProps(nextProps) {
    const token = localStorage.getItem(jwtSecretName)
    if(token) this.setState({token})
    else this.setState({token: false})
  }
  
  render() {
    const {route, history} = this.props
    const {token} = this.state
    return <div className={style.app}>
      <Header history={history} token={token} />
      <main className={style.app__main}>
        {renderRoutes(route.routes)}
      </main>
      <Footer />
    </div>
  }
}

export default connect(null, {logout})(App)
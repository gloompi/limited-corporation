import React, {Component} from 'react'
import {renderRoutes} from 'react-router-config'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'

import style from './style.styl'
import '../../assets/js/fontawesome-all.min.js'
import {jwtSecretName} from '../../../configClient'
import {logout} from '../../ducks/auth'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import icon from '../../assets/images/logo-pic.ico'

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
      <Helmet>
        <title>Cryptoinvest Systems</title>
        <link rel="icon" type="image/ico" sizes="32x32" href={icon} />
        <link rel="icon" type="image/ico" sizes="16x16" href={icon} />
      </Helmet>
      <Header history={history} token={token} />
      <main className={style.app__main}>
        {renderRoutes(route.routes)}
      </main>
      <Footer />
    </div>
  }
}

export default connect(null, {logout})(App)
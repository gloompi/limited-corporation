import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Switch} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'

import style from '../style.styl'
import Header from './Header'
import Footer from './Footer'

class Main extends Component{
  render(){
    const {route, history, openSettings, openContacts, closeSettings, closeContacts} = this.props
    return(
      <div className={style.account__main}>
        <Header history={history} openSettings={openSettings} closeSettings={closeSettings} openContacts={openContacts} closeContacts={closeContacts} />
        {renderRoutes(route.routes)}
        <Footer />
      </div>
    )
  }
}

export default Main
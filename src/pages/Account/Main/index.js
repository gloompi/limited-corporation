import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Switch} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'

import style from '../style.styl'
import Header from './Header'

class Main extends Component{
  static propTypes = {
  }

  render(){
    const {route, history} = this.props
    return(
      <div className={style.account__main}>
        <Header history={history} />
        {renderRoutes(route.routes)}
      </div>
    )
  }
}

export default Main
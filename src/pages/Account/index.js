import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'

import style from './style.styl'
import '../../assets/js/fontawesome-all.min.js'
import {fetchUser} from '../../ducks/auth'
import {jwtSecretName} from '../../../configClient'
import requireAuth from '../../components/hocs/requireAuth'
import SideBar from '../../components/AccountPanel/SideBar'

class Account extends Component{
  static propTypes = {
  }

  componentDidMount() {
    const {fetchUser} = this.props
    const userName = localStorage.getItem('userName')
    fetchUser(userName)
  }

  render(){
    const {user, route, history} = this.props
    console.log('account user----', user)
    return(
      <div className={`${style.wrapper} ${style.account__wrapper}`}>
        <SideBar history={history} />
        {renderRoutes(route.routes)}
      </div>
      
    )
  }
}

export default connect(state => ({
  loading: state.auth.userLoading
}), {fetchUser})(requireAuth(Account))
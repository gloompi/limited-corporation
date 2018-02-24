import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import style from './style.styl'
import {fetchUser} from '../../ducks/auth'
import {jwtSecretName} from '../../../configClient'
import requireAuth from '../../components/hocs/requireAuth'

class Account extends Component{
  static propTypes = {
  }

  componentDidMount() {
    const {fetchUser, userName} = this.props
    const jwt = localStorage.getItem(jwtSecretName)
    fetchUser(userName)
  }

  render(){
    const {user} = this.props
    console.log('user----', user)
    return(
      <div className={`${style.wrapper} ${style.account__main}`}>
        <div className={style.container}>
          <h2 className={style.account__title}>Личный кабинет</h2>
        </div>
      </div>
      
    )
  }
}

export default connect(state => ({
  user: state.auth.user,
  userName: state.auth.userName,
  loading: state.auth.userLoading
}), {fetchUser})(requireAuth(Account))
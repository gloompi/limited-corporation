import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {jwtSecretName} from '../../../../configClient'
import style from '../style.styl'
import {fetchAuth, logout} from '../../../ducks/auth'

class Auth extends Component{
  static propTypes = {
    fetchAuth: PropTypes.func.isRequired
  }

  render(){
    return[
      <a
        href=""
        key={2}
        className={style.sign__in}
        title="Выйти"
        onClick={this.handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
      </a>,
      <Link 
        to='/account'
        key={1}
        className={style.sign__up}>
          <i className="far fa-user"></i>
          <span>ЛИЧНЫЙ КАБИНЕТ</span>
      </Link>
    ]
  }

  handleLogout = e => {
    e.preventDefault()
    const {logout, history} = this.props

    logout()
    history.push('/')
  }
}

export default connect(null, {fetchAuth, logout})(Auth)
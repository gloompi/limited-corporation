import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import style from '../style.styl'

const Auth = (props) =>{
  return[
    <Link 
      to='/sign-in'
      key={1}
      className={style.sign__in}>
        <i className="fas fa-sign-in-alt"></i>
        <span>АВТОРИЗАЦИЯ</span>
    </Link>,
    <Link 
      to='/sign-up'
      key={2}
      className={style.sign__up}>
        <i className="far fa-user"></i>
        <span>РЕГИСТРАЦИЯ</span>
    </Link>
  ]
}

export default Auth
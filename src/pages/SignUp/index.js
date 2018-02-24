import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {jwtSecretName} from '../../../configClient'
import style from './style.styl'

class SignUp extends Component{
  static propTypes = {
  }

  componentDidMount() {
    const jwt = localStorage.getItem(jwtSecretName)
  }

  render(){
    return(
      <div className={style.container}>
        <form action="" className={style.signin__wrap}>
          <h2 className={style.signin__title}>Регистрация</h2>
          <input className={style.input} type="text" placeholder="Логин"/>
          <input className={style.input} type="password" placeholder="Пароль"/>
          <input className={style.input} type="email" placeholder="Email"/>
          <input className={style.input} type="text" placeholder="Имя"/>
          <input className={style.input} type="text" placeholder="Фамилия"/>
          <button className={style.btn} type="submit">Войти</button>
        </form>
      </div>
    )
  }
}

export default SignUp
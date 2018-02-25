import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {fetchAuth} from '../../ducks/auth'
import style from './style.styl'
import {jwtSecretName} from '../../../configClient'

class SignIn extends Component{
  static propTypes = {
  }

  state = {
    validation: null,
    token: null
  }

  componentDidMount() {
    const token = localStorage.getItem(jwtSecretName)
    if(token) return this.props.history.push('/account')
    else if(!token) return this.setState({token})
  }

  componentWillReceiveProps(nextProps) {
    const token = localStorage.getItem(jwtSecretName)
    if(!token) return this.setState({token})
    else if(token) return this.props.history.push('/account')
  }

  render(){
    const {validation} = this.state
    return(
      <div className={style.container}>
        <form action="" onSubmit={this.handleSubmit(history)} className={style.signin__wrap}>
          <h2 className={style.signin__title}>Панель входа</h2>
          <input className={style.input} type="text" placeholder="Логин"/>
          <input className={style.input} type="password" placeholder="Пароль"/>
          <button className={style.btn} type="submit">Войти</button>
        </form>
      </div>
    )
  }

  handleSubmit = history => e => {
    e.preventDefault()
    const {fetchAuth} = this.props
    const validation = {}
    const username = e.target[0].value
    const password = e.target[1].value

    if(!username) validation.username = 'Логин не может быть пустым'
    else if(username.length < 4) validation.username = 'Логин не может быть менее 4х символов'
    else validation.username = null

    if(!password) validation.password = 'Пароль не может быть пустым'
    else if(password.length < 8) validation.password = 'Пароль должен состоять из более 8ми символов'
    else validation.password = null

    this.setState({validation})
    if(validation.username == null && validation.password == null) fetchAuth(username, password)
  }
}

export default connect(state => ({
  token: state.auth.token,
  loaded: state.auth.loaded
}), {fetchAuth})(SignIn)
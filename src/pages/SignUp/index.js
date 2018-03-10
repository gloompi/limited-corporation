import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {jwtSecretName} from '../../../configClient'
import style from '../SignIn/style.styl'
import {fetchRegister} from '../../ducks/auth'

class SignUp extends Component{
  static propTypes = {
  }

  state = {
    validation: {},
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
    else if(token) return nextProps.history.push('/account')
  }

  render(){
    const {validation} = this.state
    return(
      <div className={style.container}>
        <form action="" onSubmit={this.handleSubmit} className={style.signin__wrap}>
          <h2 className={style.signin__title}>Регистрация</h2>
          {validation.username && <span className={style.warning}>{validation.username}</span>}
          <input className={style.input} type="text" placeholder="Логин"/>
          {validation.password && <span className={style.warning}>{validation.password}</span>}
          <input className={style.input} type="password" placeholder="Пароль"/>
          {validation.confirm && <span className={style.warning}>{validation.confirm}</span>}
          <input className={style.input} type="password" placeholder="Подтвердить пароль"/>
          {validation.email && <span className={style.warning}>{validation.email}</span>}
          <input className={style.input} type="email" placeholder="Email"/>
          <input className={style.input} type="text" placeholder="Имя"/>
          <input className={style.input} type="text" placeholder="Фамилия"/>
          {validation.checkbox && <span className={style.warning}>{validation.checkbox}</span>}
          <label className={style.agreement__label}>
            <input className={style.agreement__checkbox} type="checkbox"/>
            <span>Я согласен с <Link to="/agreement">условиями</Link> использования сервиса</span>
          </label>
          <button className={style.btn} type="submit">Зарегистрироваться</button>
        </form>
      </div>
    )
  }

  handleSubmit = e => {
    e.preventDefault()
    const {fetchRegister, history} = this.props
    const validation = {}
    const username = e.target[0].value
    const password = e.target[1].value
    const confirm = e.target[2].value
    const email = e.target[3].value
    const first_name = e.target[4].value
    const last_name = e.target[5].value
    const checkbox = e.target[6].checked
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if(!username) validation.username = 'Логин не может быть пустым'
    else if(username.length < 4) validation.username = 'Логин не может быть менее 4х символов'
    else validation.username = null

    if(!password) validation.password = 'Пароль не может быть пустым'
    else if(password.length < 8) validation.password = 'Пароль должен состоять из более 8ми символов'
    else validation.password = null

    if(!confirm) validation.confirm = 'Подтвердите пароль'
    else if(password !== confirm) validation.confirm = 'Пароли не совпадают'
    else validation.confirm = null

    if(!email) validation.email = 'Укажите почтовый адрес'
    else if(!re.test(String(email).toLowerCase())) validation.email = 'Укажите корректный email'
    else validation.email = null

    if(!checkbox) validation.checkbox = 'Примите пользовательское соглашение'
    else validation.checkbox = null

    this.setState({validation})
    if(validation.username == null && validation.password == null && validation.email == null && validation.checkbox == null) fetchRegister(username, password, email, first_name, last_name, history)
  }
}

export default connect(state => ({
  token: state.auth.token,
  loaded: state.auth.loaded
}), {fetchRegister})(SignUp)
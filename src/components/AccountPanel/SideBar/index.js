import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {logout} from '../../../ducks/auth'
import style from '../../../pages/Account/style.styl'
import MnuList from './MnuList'

class SideBar extends Component{
  static propTypes = {
  }

  state = {
    activeNav: {
      deposits: false,
      balance: false,
      pay_off: false,
      programm: false
    }
  }

  render(){
    const {activeNav} = this.state
    const {openSettings, closeSettings} = this.props
    return(
      <div className={style.account__sidebar}>
        <Link to="/account" className={style.sidebar__logo}>
          <img src={require('../../../assets/images/logo-pic.png')} alt="logo"/>
          <h3>Cryptoinvest.systems</h3>
          <span>Future starts today</span>
        </Link>
        <nav className={style.sidebar__nav}>
          <Link to='/' className={style.sidebar__home_btn}>
            <i className="fas fa-long-arrow-alt-left"></i>
            Главная
          </Link>
          <MnuList activeNav={activeNav} handleClick={this.handleClick} />
          <Link to='/' className={style.sidebar__home_btn} onClick={this.handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            Выйти
          </Link>
          <a href="" onClick={openSettings} className={style.sidebar__setup_btn}>
            <i className="fas fa-cog"></i>
            Настройки профайла
          </a>
        </nav>
      </div>
    )
  }

  handleLogout = e => {
    e.preventDefault()
    const {logout, history} = this.props

    logout()
    history.push('/')
  }

  handleClick = currentNav => e => {
    e.preventDefault()

    this.setState(state => {
      const navObj = {}
      Object.keys(state.activeNav).map(nav => {
        navObj[nav] = false
      })
      if(!state[currentNav]) navObj[currentNav] = true
      else navObj[currentNav] = false
      return state.activeNav = navObj
    })
  }
}

export default connect(null, {logout})(SideBar)
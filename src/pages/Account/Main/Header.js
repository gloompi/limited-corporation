import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import style from '../style'
import {logout} from '../../../ducks/auth'
import Loader from '../../../components/Loader'

class Header extends Component{
  state = {
    accountPopUp: false,
    contactsPopUp: false
  }

  componentDidMount() {
    document.addEventListener('click', (e) => {
      if(e.target.className != style.account__mnu_list && e.target.parentNode.className != style.account__mnu_list){
        if(e.target.className != style.account__header_link && e.target.parentNode.className != style.account__header_link && this.state.accountPopUp) {
          this.setState({ accountPopUp: false })
        }
      }
    })
  }

  render(){
    const {accountPopUp, contactsPopUp} = this.state
    const {user, loaded, openContacts, closeContacts, openSettings} = this.props
    if(!loaded) return <Loader />
    const {first_name, username} = user
    return(
      <ul className={style.account__header_list}>
        <li className={style.account__header_item}>
          <a href="" onClick={openContacts} className={style.account__header_link}>
            <i className="fas fa-headphones"></i>
            <span>Контактный центр</span>
          </a>
        </li>
        <li className={style.account__header_item}>
          <a href="" className={style.account__header_link} onClick={this.handleAcountClick}>
            <div className={style.user__link_wrap}><i className="fas fa-user"></i></div>
            <span>Здравствуйте, {first_name || username || 'User'}</span>
            <i className={`fas fa-angle-down ${style.icon}`}></i>
          </a>
          <ul className={`${style.account__mnu_list} ${accountPopUp && style.active}`}>
           <li className={style.account__mnu_item}>
             <Link to='/account' className={style.account__mnu_link}>
              <i className="fas fa-university"></i>
              <span>Создать депозит</span>
             </Link>
           </li>
           <li className={style.account__mnu_item}>
             <Link to='/account/create-payoff-request' className={style.account__mnu_link}>
              <i className="far fa-credit-card"></i>
              <span>Вывести средства</span>
             </Link>
           </li>
           <li className={style.account__mnu_item}>
             <Link to='/account/partner-links' className={style.account__mnu_link}>
              <i className="far fa-file-alt"></i>
              <span>Партнерская программа</span>
             </Link>
           </li>
           <li className={style.account__mnu_item}>
             <a href='' onClick={openSettings} className={style.account__mnu_link}>
              <i className="fas fa-cog"></i>
              <span>Настройки профайла</span>
             </a>
           </li>
           <li className={style.account__mnu_item}>
             <Link to='/account/logout' className={style.account__mnu_link} onClick={this.handleLogout}>
              <i className="fas fa-power-off"></i>
              <span>Выйти</span>
             </Link>
           </li>
          </ul>
        </li>
      </ul>
    )
  }

  handleLogout = e => {
    e.preventDefault()
    const {logout, history} = this.props

    logout()
    history.push('/')
  }

  handleAcountClick = e => {
    e.preventDefault()

    this.setState(state => ({accountPopUp: !state.accountPopUp}))
  }
}

export default connect(state => ({
  user: state.auth.user,
  loaded: state.auth.userLoaded
}), {logout})(Header)
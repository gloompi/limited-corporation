import React from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'

import style from './style.styl'

import CoinParser from './CoinParser'
import SocialList from './SocialList'
import Menu from './Menu'
import Auth from './Auth'
import AccountWidget from './AccountWidget'

function Header({loggedIn, history, token}){
  return(
    <header className={style.header}>
      <div className={style.header__top}>
        <div className={style.container}>
          <ul className={style.header__list}>
            <li className={style.header__item}>
              <CoinParser />
            </li>
            <li className={style.header__item}>
              <SocialList />
            </li>
            <li className={style.header__item}>
              <a href="mailto: support@cryptoinvest.systems" className={style.help__btn}>
                <span>Оффлайн поддержка</span>
                <span>support@cryptoinvest.systems</span>
              </a>
              <a href="tel: 8-800-511-03-82" className={style.help__btn}>
                <span>Центр поддержки</span>
                <span>8-800-511-03-82</span>
              </a>
            </li>
            <li className={style.header__item}>
              {
                token
                ? <AccountWidget history={history} />
                : <Auth />
              }
            </li>
          </ul>
        </div>
      </div>
      <div className={style.header__bottom}>
        <div className={style.container}>
          <div className={style.header__container}>
            <NavLink to="/">
              <div className={style.logo}>
                <img src={require('../../assets/images/logo-pic.png')} alt="logo"/>
                <div>
                  <h3>Cryptoinvest.systems</h3>
                  <span>Future starts today</span>
                </div>
              </div>
            </NavLink>
            <Menu />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
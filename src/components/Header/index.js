import React from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'

import style from './style.styl'

import CoinParser from './CoinParser'
import SocialList from './SocialList'
import Menu from './Menu'

function Header(props){
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
              <a href="" className={style.help__btn}>
                <span>Оффлайн поддержка</span>
                <span>support@ltd-corporation.org</span>
              </a>
              <a href="" className={style.help__btn}>
                <span>Центр поддержки</span>
                <span>8-800-511-03-82</span>
              </a>
            </li>
            <li className={style.header__item}>
              <a href="" className={style.sign__in}>
                <i className="fas fa-sign-in-alt"></i>
                <span>АВТОРИЗАЦИЯ</span>
              </a>
              <a href="" className={style.sign__up}>
                <i className="far fa-user"></i>
                <span>РЕГИСТРАЦИЯ</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={style.header__bottom}>
          <NavLink to="/">
            <div className={style.logo}></div>
          </NavLink>
          <Menu />
      </div>
    </header>
  )
}

export default Header
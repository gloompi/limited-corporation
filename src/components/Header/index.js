import React from 'react'
import PropTypes from 'prop-types'

import style from './style.styl'

import CoinParser from './CoinParser'
import SocialList from './SocialList'

function Header(props){
  return(
    <header className={style.header}>
      <div className={style.container}>
        <ul className={style.header__list}>
          <li className={style.header__item}>
            <CoinParser />
          </li>
          <li className={style.header__item}>
            <SocialList />
          </li>
          <li className={style.header__item}>
            <a href="" className="company__help-btn">
              Оффлайн поддержка support@ltd-corporation.org
            </a>
            <a href="" className="company__help-btn">
              Центр поддержки 8-800-511-03-82
            </a>
          </li>
          <li className={style.header__item}>
            <a href="" className="sign__in-btn">
            </a>
            <a href="" className="sign__up-btn">
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
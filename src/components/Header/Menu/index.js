import React from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'

import style from '../style.styl'

function Menu(props){
  return(
    <nav className={style.mnu__list}>
      <li className={style.mnu__item}>
        <NavLink 
          to="/" 
          exact
          className={style.mnu__link} 
          activeClassName={style.active}>
            Главная
        </NavLink>
      </li>
      <li className={style.mnu__item}>
        <NavLink 
          to="/about" 
          className={style.mnu__link} 
          activeClassName={style.active}>
            О компании
        </NavLink>
      </li>
      <li className={style.mnu__item}>
        <NavLink 
          to="/news" 
          className={style.mnu__link} 
          activeClassName={style.active}>
            Новости
        </NavLink>
      </li>
      <li className={style.mnu__item}>
        <NavLink 
          to="/how-to-start" 
          className={style.mnu__link} 
          activeClassName={style.active}>
            Как начать?
        </NavLink>
      </li>
      <li className={style.mnu__item}>
        <NavLink 
          to="/for-investors" 
          className={style.mnu__link} 
          activeClassName={style.active}>
            Инвесторам
        </NavLink>
      </li>
      <li className={style.mnu__item}>
        <NavLink 
          to="/for-partners" 
          className={style.mnu__link} 
          activeClassName={style.active}>
            Партнерам
        </NavLink>
      </li>
      <li className={style.mnu__item}>
        <NavLink 
          to="/faq" 
          className={style.mnu__link} 
          activeClassName={style.active}>
            FAQ
        </NavLink>
      </li>
      <li className={style.mnu__item}>
        <NavLink 
          to="/contacts" 
          className={style.mnu__link} 
          activeClassName={style.active}>
            Контакты
        </NavLink>
      </li>
    </nav>
  )
}

export default Menu
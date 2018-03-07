import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

import style from '../../../pages/Account/style.styl'

function BreadCrumbs({title, pathName}){
  return(
    <div className={style.breadcrumb__wrapper}>
      <h3 className={style.breadcrumb__title}>{title}</h3>
      <ul className={style.breadcrumb__list}>
        <li className={style.breadcrumb__item}>
          <NavLink to="/" activeStyle={{color: '#FE510D'}} >Главная</NavLink>
        </li>
        <li className={style.breadcrumb__item}>Личный кабинет</li>
        <li className={style.breadcrumb__item}>{pathName}</li>
      </ul>
    </div>
  )
}

export default BreadCrumbs
import React from 'react'
import PropTypes from 'prop-types'
import {NavLink, Link} from 'react-router-dom'

import style from '../../../pages/Account/style.styl'

function MnuList({activeNav, handleClick}){
  const {deposits, balance, pay_off, programm} = activeNav
  return(
    <ul className={style.sidebar__list}>
      <li className={`${style.sidebar__item} ${deposits && style.active}`}>
        <a href="" className={style.sidebar__mnu_btn} onClick={handleClick('deposits')}>
          <span><i className="fas fa-university"></i>Ваши депозиты</span>
          {deposits ? <i className={`fas fa-angle-down ${style.icon}`}></i> : <i className={`fas fa-angle-right ${style.icon}`}></i>}
        </a>
        <ul className={style.sidebar__inner_list}>
          <li className={style.sidebar__inner_item}>
            <NavLink exact to='/account' activeStyle={{color: "#000"}} className={style.sidebar__inner_btn}>
              Создать депозит
            </NavLink>
          </li>
          <li className={style.sidebar__inner_item}>
            <NavLink to='/account/deposit-list' activeStyle={{color: "#000"}} className={style.sidebar__inner_btn}>
              Список депозитов и статистика акаунтов
            </NavLink>
          </li>
        </ul>
      </li>
      <li className={`${style.sidebar__item} ${balance && style.active}`}>
        <a href="" className={style.sidebar__mnu_btn} onClick={handleClick('balance')}>
          <span><i className="fas fa-credit-card"></i>Пополнить баланс</span>
          {deposits ? <i className={`fas fa-angle-down ${style.icon}`}></i> : <i className={`fas fa-angle-right ${style.icon}`}></i>}
        </a>
        <ul className={style.sidebar__inner_list}>
          <li className={style.sidebar__inner_item}>
            <NavLink to='/account/charge' activeStyle={{color: "#000"}} className={style.sidebar__inner_btn}>
              Выбрать способ оплаты
            </NavLink>
          </li>
          <li className={style.sidebar__inner_item}>
            <NavLink to='/account/charge-history' activeStyle={{color: "#000"}} className={style.sidebar__inner_btn}>
              История пополнения баланся
            </NavLink>
          </li>
        </ul>
      </li>
      <li className={`${style.sidebar__item} ${pay_off && style.active}`}>
        <a href="" className={style.sidebar__mnu_btn} onClick={handleClick('pay_off')}>
          <span><i className="far fa-credit-card"></i>Вывести деньги</span>
          {deposits ? <i className={`fas fa-angle-down ${style.icon}`}></i> : <i className={`fas fa-angle-right ${style.icon}`}></i>}
        </a>
        <ul className={style.sidebar__inner_list}>
          <li className={style.sidebar__inner_item}>
            <NavLink to='/account/create-payoff-request' activeStyle={{color: "#000"}} className={style.sidebar__inner_btn}>
              Создать заявку на вывод средств
            </NavLink>
          </li>
          <li className={style.sidebar__inner_item}>
            <NavLink to='/account/payoff-history' activeStyle={{color: "#000"}} className={style.sidebar__inner_btn}>
              История вывода средств
            </NavLink>
          </li>
        </ul>
      </li>
      <li className={`${style.sidebar__item} ${programm && style.active}`}>
        <a href="" className={style.sidebar__mnu_btn} onClick={handleClick('programm')}>
          <span><i className="far fa-file-alt"></i>Партнерская программа</span>
          {deposits ? <i className={`fas fa-angle-down ${style.icon}`}></i> : <i className={`fas fa-angle-right ${style.icon}`}></i>}
        </a>
        <ul className={style.sidebar__inner_list}>
          <li className={style.sidebar__inner_item}>
            <NavLink to='/account/partner-links' activeStyle={{color: "#000"}} className={style.sidebar__inner_btn}>
              Партнерские ссылки
            </NavLink>
          </li>
          <li className={style.sidebar__inner_item}>
            <NavLink to='/account/partner-statistic' activeStyle={{color: "#000"}} className={style.sidebar__inner_btn}>
              Статистика партнеров
            </NavLink>
          </li>
        </ul>
      </li>
    </ul>
  )
}

export default MnuList
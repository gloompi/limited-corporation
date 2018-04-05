import React from 'react'
import PropTypes, { func } from 'prop-types'

import style from './style'
import {splitBy3} from '../../helpers'
import Loader from '../Loader'
import kz from '../../assets/images/kz.gif'
import ru from '../../assets/images/ru.gif'
import br from '../../assets/images/br.gif'
import by from '../../assets/images/by.gif'

function Statistic({loaded, holding_users, investors, payoff_users, payedoff, holded, total}){
  let today = new Date().toISOString()
  today = today.slice(0, today.indexOf('T'))
  return(
    <section className={`${style.section} ${style.statistic__wrap}`}>
      <div className={`${style.container} ${style.section__container}`}>
        <div className={style.section__icon}>
          <i className="fas fa-chart-pie"></i>
        </div>
        <h2 className={style.section__title}>Живая статистика</h2>
        <span className={style.section__longtitle}>Просмотр операций системы</span>
        <ul className={style.statistic__list}>
          <li className={style.statistic__item}>
            <div className={style.statistic__icon_wrap}>
              <div className={style.statistic__icon}><i className="fas fa-th"></i></div>
            </div>
            <div className={style.statistic__txt_wrap}>
              <span className={style.statistic__item_txt}>Депозитов</span>
              <span className={style.statistic__item_txt}>{loaded ? splitBy3(total) : <Loader />}</span>
            </div>
          </li>
          <li className={style.statistic__item}>
            <div className={style.statistic__icon_wrap}>
              <div className={style.statistic__icon}><i className="far fa-user"></i></div>
            </div>
            <div className={style.statistic__txt_wrap}>
              <span className={style.statistic__item_txt}>Инвесторов</span>
              <span className={style.statistic__item_txt}>{loaded ? splitBy3(investors) : <Loader />}</span>
            </div>  
          </li>
          <li className={style.statistic__item}>
            <div className={style.statistic__icon_wrap}>
              <div className={style.statistic__icon}><i className="fab fa-cc-visa"></i></div>
            </div>
            <div className={style.statistic__txt_wrap}>
              <span className={style.statistic__item_txt}>Инвестировано</span>
              <span className={style.statistic__item_txt}>{loaded ? splitBy3(holded) : <Loader />} RUB</span>
            </div>  
          </li>
          <li className={style.statistic__item}>
            <div className={style.statistic__icon_wrap}>
              <div className={style.statistic__icon}><i className="fab fa-cc-amazon-pay"></i></div>
            </div>
            <div className={style.statistic__txt_wrap}>
              <span className={style.statistic__item_txt}>Выплачено</span>
              <span className={style.statistic__item_txt}>{loaded ? splitBy3(payedoff) : <Loader />} RUB </span>
            </div>  
          </li>
        </ul>
        <div className={style.statistic__payment}>
          <div className={style.statistic__payment_wrap}>
            <h3 className={style.statistic__payment_title}>Последние вклады</h3>
            <ul className={style.statistic__payment_list}>
              {loaded ? holding_users.map(user => <li key={user.name} className={style.statistic__payment_item}>
                <div className={style.statistic__payment_info_wrap}>
                  <span className={style.statistic__payment_info_title}>Логин</span>
                  <span className={style.statistic__payment_info}>
                    <img src={getFlag(user.country)} alt="country"/>
                    {user.name}
                  </span>
                </div>
                <div className={style.statistic__payment_info_wrap}>
                  <span className={style.statistic__payment_info_title}>Дата</span>
                  <span className={style.statistic__payment_info}>{today}</span>
                </div>
                <div className={style.statistic__payment_info_wrap}>
                  <span className={style.statistic__payment_info_title}>Сумма</span>
                  <span className={style.statistic__payment_info}>{user.sum} РУБ</span>
                </div>
              </li>) : <Loader />}
            </ul>
          </div>
          <div className={style.statistic__payment_wrap}>
            <h3 className={style.statistic__payment_title}>Последние выплаты</h3>
            <ul className={style.statistic__payment_list}>
              {loaded ? payoff_users.map(user => <li key={user.name} className={style.statistic__payment_item}>
                <div className={style.statistic__payment_info_wrap}>
                  <span className={style.statistic__payment_info_title}>Логин</span>
                  <span className={style.statistic__payment_info}>
                    <img src={getFlag(user.country)} alt="country"/>
                    {user.name}
                  </span>
                </div>
                <div className={style.statistic__payment_info_wrap}>
                  <span className={style.statistic__payment_info_title}>Дата</span>
                  <span className={style.statistic__payment_info}>{today}</span>
                </div>
                <div className={style.statistic__payment_info_wrap}>
                  <span className={style.statistic__payment_info_title}>Сумма</span>
                  <span className={style.statistic__payment_info}>{user.sum} РУБ</span>
                </div>
              </li>) : <Loader />}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function getFlag(number){
  switch(number){
    case 1:
      return kz
    case 2:
      return ru
    case 3: 
      return br
    case 4:
      return by

    default:
      return number
  }
}

export default Statistic
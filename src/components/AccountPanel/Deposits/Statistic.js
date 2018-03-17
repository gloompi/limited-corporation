import React from 'react'
import PropTypes from 'prop-types'

import style from '../../../pages/Account/style.styl'

function Statistic(props){
  return(
    <div className={`${style.section} ${style.account__section}`}>
      <div className={style.section__top}>
        <h3 className={style.section__title}>Ваша финансовая статистика:</h3>
      </div>
      <div className={style.section__container}>
        <ul className={style.statistic__list}>
          <li className={style.statistic__item}>
            <div className={style.statistic__info}>
              <div className={style.icon__wrap}>  
                <i className="far fa-money-bill-alt"></i>
              </div>
              <div>
                <h4 className={style.statistic__info_title}>Всего депозитов:</h4>
                <span className={style.statistic__info_descr}>Общая сумма внесенных Вами средств в депозиты</span>
              </div>
            </div>
            <span className={style.statistic__value} style={{backgroundColor: '#FF2830'}}>0 руб.</span>
          </li>
          <li className={style.statistic__item}>
            <div className={style.statistic__info}>
              <div className={style.icon__wrap}> 
                <i className="fas fa-chart-line"></i>
              </div>
              <div>
                <h4 className={style.statistic__info_title}>Всего выведено:</h4>
                <span className={style.statistic__info_descr}>Общая сумма выведенных Вами средств</span>
              </div>
            </div>
            <span className={style.statistic__value} style={{backgroundColor: '#FF3C7E'}}>0 руб.</span>
          </li>
          <li className={style.statistic__item}>
            <div className={style.statistic__info}>
              <div className={style.icon__wrap}>
                <i className="fas fa-briefcase"></i>
              </div>
              <div>
                <h4 className={style.statistic__info_title}>Активные депозиты:</h4>
                <span className={style.statistic__info_descr}>Общая сумма всех активных депозитов</span>
              </div>
            </div>
            <span className={style.statistic__value} style={{backgroundColor: '#37C936'}}>0 руб.</span>
          </li>
          <li className={style.statistic__item}>
            <div className={style.statistic__info}>
              <div className={style.icon__wrap}>
                <i className="fas fa-user-circle"></i>
              </div>
              <div>
                <h4 className={style.statistic__info_title}>Партнерская программа:</h4>
                <span className={style.statistic__info_descr}>Общая сумма средств, заработаных по реферальной программе</span>
              </div>
            </div>
            <span className={style.statistic__value} style={{backgroundColor: '#fe510d'}}>0 руб.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Statistic
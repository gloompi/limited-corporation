import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import style from '../style.styl'

function CoinDisplay({slug, title, percent, duration, amount_floor, amount_ceil, pay_off}){
  const profit = percent-100
  const profitPerDay = profit / duration + ''
  return(
    <div className={style.display__wrap}>
      <div className={style.icon__wrap}><i className={`fas fa-database ${style.icon}`}></i></div>
      <div className={style.coin__content_wrap}> 
        <div className={style.profit__percent}>{`+${percent}%`}</div>
        <div className={style.coin__name}>{title}</div>
      </div>
      <div className={style.coin__content_wrap}>
        <div className={style.coin__content_title}>Прибыль от депозита:</div>
        <span className={style.coin__content_value}>{`${profit}% за ${duration} дней`}</span>
      </div>
      <div className={style.coin__content_wrap}>
        <div className={style.coin__content_title}>Период начислений:</div>
        <span className={style.coin__content_value}>{`${profitPerDay.slice(0, profitPerDay.indexOf('.') + 2)}% каждые 24 ч.`}</span>
      </div>
      <div className={style.coin__content_wrap}>
        <div className={style.coin__content_title}>Сумма депозита:</div>
        <span className={style.coin__content_value}>{`${amount_floor} - ${amount_ceil} RUB`}</span>
      </div>
      <div className={style.coin__content_wrap}>
        <div className={style.coin__content_title}>Возврат депозита:</div>
        <span className={style.coin__content_value}>{pay_off}</span>
      </div>
      <Link to="/account" className={style.invest__btn}>Инвестировать</Link>
    </div>
  )
}

export default CoinDisplay
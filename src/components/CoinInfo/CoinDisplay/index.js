import React from 'react'
import PropTypes from 'prop-types'

import style from '../style.styl'

function CoinDisplay({coin, profit, content}){
  return(
    <div className={style.display__wrap}>
      <div className={style.icon__wrap}><i class={`fas fa-database ${style.icon}`}></i></div>
      <div className={style.profit__percent}>{`+${profit}%`}</div>
      <div className={style.coin__name}>{coin}</div>
      <div>{content}</div>
      <a href="" className={style.invest__btn}>Инвестировать</a>
    </div>
  )
}

export default CoinDisplay
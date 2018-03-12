import React from 'react'
import PropTypes from 'prop-types'

import style from '../../../pages/Account/style.styl'

function DepositsList(props){
  return(
    <div className={`${style.section} ${style.account__section}`}>
      <div className={style.section__top}>
        <h3 className={style.section__title}>Статус ваших заявок на вывод средств:</h3>
      </div>
      <div className={style.section__container}>
        <table className={`${style.table} ${style.payoff}`}>
          <tr>
            <th>Сумма</th>
            <th>Дата</th>
            <th>Платежная система</th>
            <th>Комментарий</th>
            <th>Статус</th>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default DepositsList
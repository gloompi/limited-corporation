import React from 'react'
import PropTypes from 'prop-types'

import style from '../../../pages/Account/style.styl'

function DepositsList(props){
  return(
    <div className={style.section}>
      <div className={style.section__top}>
        <h3 className={style.section__title}>Список открытых и закрытых депозитов:</h3>
      </div>
      <div className={style.section__container}>
        <table className={style.table}>
          <tr>
            <th>Дата депозита, окончания</th>
            <th>Вклад, %, Прибыль</th>
            <th>Заработано</th>
            <th>Период</th>
            <th>Статус</th>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default DepositsList
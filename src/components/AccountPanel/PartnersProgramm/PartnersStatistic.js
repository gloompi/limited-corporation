import React from 'react'
import PropTypes from 'prop-types'

import style from '../../../pages/Account/style.styl'

function PartnerStatistic(props){
  return(
    <div className={style.section__wrap}>
        <div className={`${style.section} ${style.account__section}`}>
        <div className={style.section__top}>
            <h3 className={style.section__title}>Список ваших партнеров </h3>
        </div>
        <div className={style.section__container}>
            <table className={style.table}>
            <tr>
                <th>Логин реферала</th>
                <th>Пополнил</th>
            </tr>
            </table>
        </div>
        </div>
    </div>
  )
}

export default PartnerStatistic
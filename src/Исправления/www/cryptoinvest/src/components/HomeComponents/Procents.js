import React from 'react'
import PropTypes from 'prop-types'

import style from './style'

function Procents(props){
  return(
    <ul className={style.partner__diagram_list}>
      <li className={style.partner__diagram_item}>
        <h3 className={style.partner__diagram_title}>1 Ур</h3>
        <span className={style.partner__diagram_type}>Партнер - 5%</span>
        <span className={style.partner__diagram_type}>Оборот рефералов до 300 000 RUB</span>
      </li>
      <li className={style.partner__diagram_item}>
        <h3 className={style.partner__diagram_title}>2 Ур</h3>
        <span className={style.partner__diagram_type}>Партнер - 1%</span>
        <span className={style.partner__diagram_type}>Оборот рефералов от 300 000 RUB до 600 000 RUB</span>
      </li>
      <li className={style.partner__diagram_item}>
        <h3 className={style.partner__diagram_title}>3 Ур</h3>
        <span className={style.partner__diagram_type}>Партнер - 1%</span>
        <span className={style.partner__diagram_type}>Оборот рефералов от 600 000 RUB</span>
      </li>
    </ul>
  )
}

export default Procents
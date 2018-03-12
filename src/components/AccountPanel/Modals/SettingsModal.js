import React from 'react'
import PropTypes from 'prop-types'

import style from '../../../pages/Account/style'

function SettingsModal({open, handleClose}){
  return(
    <div className={`${style.modal__wrap} ${open && style.active}`}>
      <div className={style.modal}>
        <h1>Настройки профиля</h1>
        <a href="" className={style.close__btn_x} onClick={handleClose}>&times;</a>
        <a href="" className={style.close__btn} onClick={handleClose}>Закрыть</a>
      </div>
    </div>
  )
}

export default SettingsModal
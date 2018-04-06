import React from 'react'
import PropTypes from 'prop-types'

import style from '../../../pages/Account/style'

function ContactsModal({open, handleClose}){
  return(
    <div className={`${style.modal__wrap} ${open && style.active}`}>
      <div className={style.modal}>
        <h2 className={style.modal__header}>
          <i className="fas fa-headphones"></i>
          <span>Контактный центр</span>
        </h2>
        <a href="" className={style.close__btn_x} onClick={handleClose}>&times;</a>
        <div className={`${style.modal__container} ${style.contacts}`}>
          <ul className={style.modal__list}>
            <span className={style.title}>Подпишитесь на наши социальные сети чтобы всегда быть в курсе событий:</span>
            <li className={style.modal__item}>
              <a className={style.modal__link}>
                <img src={require('../../../assets/images/icons/vk.png')} />
                <div>
                  <span>/cryptoinvest</span>
                  <span className={style.link}>подписаться</span>
                </div>
              </a>
            </li>
            <li className={style.modal__item}>
              <a className={style.modal__link}>
                <img src={require('../../../assets/images/icons/yb.png')} />
                <div>
                  <span>Cryptoinvest</span>
                  <span className={style.link}>подписаться</span>
                </div>
              </a>
            </li>
          </ul>
          <ul className={style.modal__list}>
            <span className={style.title}>Контакты консультантов и технической поддержки:</span>
            <li className={style.modal__item}>
              <a className={style.modal__link}>
                <img src={require('../../../assets/images/icons/vk.png')} />
                <div>
                  <span>/cryptoinvest</span>
                  <span className={style.link}>написать</span>
                </div>
              </a>
            </li>
            <li className={style.modal__item}>
              <a className={style.modal__link}>
                <img src={require('../../../assets/images/icons/email.png')} />
                <div>
                  <span>support@cryptoinvest.systems</span>
                  <span className={style.link}>написать</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <a href="" className={style.close__btn} onClick={handleClose}>Закрыть</a>
      </div>
    </div>
  )
}

export default ContactsModal
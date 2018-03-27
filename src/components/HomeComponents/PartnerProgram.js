import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import style from './style'
import img1 from '../../assets/images/part-1-1.png'
import img2 from '../../assets/images/partner.png'
import Procents from './Procents'

function PartnerProgram(props){
  return(
    <section className={`${style.section} ${style.partner__wrap}`}>
      <div className={`${style.container} ${style.section__container}`}>
        <div className={style.section__icon}>
          <i className="fas fa-user-plus"></i>
        </div>
        <h2 className={style.section__title}>Партнерская программа</h2>
        <span className={style.section__longtitle}>На нашей платформе вы можете зарабатывать без вложений</span>
        <div className={style.partner__descr}>
          <p>Дополнительным заработком на платформе является 3-х-уровневая партнерская программа. Приглашая новых участников, зарабатывайте до 5% от их вкладов. При правильном подходе - это отличная возможность получать пассивную прибыль не вкладывая собственные средства.</p>
        </div>
        <div className={style.partner__btns_wrap}>
          <Link to='/account/partner-links' className={`${style.partner__btn} ${style.red}`}>Стать партнером</Link>
        </div>
        <div className={style.partner__info_wrap}>
          <div className={style.partner__info_container}>
            <div className={style.partner__img_wrap}>
              <img src={img1} alt="partner img"/>
              <span className={style.partner__icon_wrap}><i className="fas fa-angle-double-up"></i></span>
            </div>
            <div>
              <h3 className={style.partner__info_title}>Карьерный рост</h3>
              <span className={style.partner__info_descr}>Платформа дает возможность партнерского развития, Вы можете повышать свой партнерский статус и увеличивать свой партнерский доход.</span>
            </div>
          </div>
          <div className={style.partner__info_container}>
            <div className={style.partner__img_wrap}>
              <img src={img2} alt="partner img"/>
              <span className={style.partner__icon_wrap}><i className="fab fa-hubspot"></i></span>
            </div>
            <div>
              <h3 className={style.partner__info_title}>Система уровней</h3>
              <span className={style.partner__info_descr}>Партнерская программа включает в себя многоуровневую систему развития, тем самым расширяет ваши возможности и увеличивает доход.</span>
            </div>
          </div>
        </div>
        <h3 className={style.partner__title}>Проценты</h3>
        <Procents />
      </div>
    </section>
  )
}

export default PartnerProgram
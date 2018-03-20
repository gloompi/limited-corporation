import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import style from './style'
import Map from '../../components/Map'

class Contacts extends Component{
  static propTypes = {
  }

  render(){
    return(
      <div className={style.wrapper}>
        <section className={style.section}>
          <div className={`${style.container} ${style.section__container}`}>
            <div className={style.section__icon}>
              <i className="fas fa-newspaper"></i>
            </div>
            <h2 className={style.section__title}>Контакты</h2>
            <div className={style.contacts__wrap}>
              <div className={style.contacts__container}>
                <h3 className={style.contacts__title}>Контактные данные нашего центра</h3>
                <span className={style.contacts__descr}>Мы убеждены, что коммуникация является одним из ключевых инструментов успеха в нашем деле. Выберите отдел, и мы обязательно ответим вам в кратчайшие строки.</span>
                <div className={style.contacts__item_wrap}>
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <h3 className={style.contacts__item_title}>Арендуемый офис:</h3>
                    <span className={style.contacts__item_info}>
                      <p>Россия, 129344, Москва,</p>
                      <p>ул. Искры, дом 31,</p>
                      <p>строение 1, офис 709А</p>
                    </span>
                  </div>
                </div>
                <div className={style.contacts__item_wrap}>
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <h3 className={style.contacts__item_title}>Юридический адрес:</h3>
                    <span className={style.contacts__item_info}>
                      <p>Россия, 123100, Москва</p>
                      <p>ул. Сущёвский Вал, дом 5, строение 18</p>
                    </span>
                  </div>
                </div>
                <a href="mailto: support@cryptoinvest.systems" className={style.footer__top_contacts}>
                  <span>Оффлайн поддержка</span>
                  <b>support@cryptoinvest.systems</b>
                </a>
              </div>
              <form action="" className={style.contacts__form}>
                <h3 className={style.contacts__form_title}>Форма обратной связи</h3>
                <input className={style.contacts__form_input} type="text" placeholder="Ваше имя"/>
                <input className={style.contacts__form_input} type="email" placeholder="Email"/>
                <textarea className={style.contacts__form_textarea} placeholder="Ваше сообщение"/>
                <button className={style.contacts__form_btn} type="submit">Отправить</button>
              </form>
              <Map />
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Contacts
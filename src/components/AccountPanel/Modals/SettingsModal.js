import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import style from '../../../pages/Account/style'
import {userId} from '../../../../configClient'

class SettingsModal extends Component{
  state = {
    passwordModal: false,
    emailModal: false
  }

  render(){
    const {open, handleClose, loaded, user} = this.props
    const {passwordModal, emailModal} = this.state
    const {id, username, first_name, last_name, email} = user
    const userNumber = +userId + +id
    return(
      <div className={`${style.modal__wrap} ${open && style.active}`}>
        <div className={style.modal}>
          <h2 className={`${style.modal__header} ${style.blue}`}>
            <span>Настройки профайла</span>
          </h2>
          <a href="" className={`${style.close__btn_x} ${style.red}`} onClick={handleClose}>&times;</a>
          <div className={style.modal__container}>
            <div className={style.modal__top}>
              <div className={style.user__pic_wrap}>  
                <div>
                  <i className={`fas fa-user ${style.user__pic}`}></i>
                </div>
              </div>
              <h3 className={style.user_name}>
                {first_name && last_name ? `${first_name} ${last_name}` : username}
              </h3>
              <span className={style.user_identificator}>инвестор #{userNumber}</span>
            </div>
            <div className={style.modal__info}>
              <i className="fas fa-unlock-alt" />
              <div className={style.modal__info_txt}>
                <h3 className={style.modal__info_title}>Пароль</h3>
                <span className={style.modal__info_descr}>
                  Для безопасности Вашего аккаунта, рекомендуем изменять пароль раз в три месяца, а также не использовать одинаковые комбинации.
                </span>
                <a href="" onClick={this.handlePasswordChange} className={style.modal__info_link}>
                  <i className="fas fa-cogs" />
                  Изменить пароль
                </a>
                <div className={`${style.info__window} ${passwordModal && style.active}`}>
                  <h3>Вам необходимо</h3>
                  <ul>
                    <li>Выйти с аккаунта</li>
                    <li>Перейти в раздел "Сброс пароля" </li>
                    <li>Главная >> Вход в кабинет >> Восстановить пароль</li>
                    <li>Следовать дальнейшим инструкциям</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={style.modal__info}>
              <i className="fas fa-envelope" />
              <div className={style.modal__info_txt}>
                <h3 className={style.modal__info_title}>E-Mail</h3>
                <span className={style.modal__info_descr}>
                  Ваш E-MAIL: {email}
                </span>
                <a href="" onClick={this.handleEmailChange} className={style.modal__info_link}>
                  <i className="fas fa-cogs" />
                  Изменить E-mail
                </a>
                <div className={`${style.info__window} ${emailModal && style.active}`}>
                  <span>В целях безопасности Вашего аккаунта смена e-mail адреса доступна только через обращение в клиентскую службу поддержки.</span>
                </div>
              </div>
            </div>
          </div>
          <a href="" className={style.close__btn} onClick={handleClose}>Закрыть</a>
        </div>
      </div>
    )
  }

  handleEmailChange = e => {
    e.preventDefault()

    this.setState({emailModal: !this.state.emailModal})
  }

  handlePasswordChange = e => {
    e.preventDefault()

    this.setState({passwordModal: !this.state.passwordModal})
  }
}

export default connect(({auth}) => ({
  user: auth.user,
  loaded: auth.userLoaded
}))(SettingsModal)
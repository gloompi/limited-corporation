import React, {Component} from 'react'
import PropTypes from 'prop-types'

import style from '../../../pages/Account/style.styl'

class CoinForm extends Component{
  state = {
    inputvalue: ''
  }

  render(){
    const {inputvalue} = this.state
    const {slug, title, percent, duration, amount_floor, amount_ceil, pay_off} = this.props.coin
    const percentPerDay = (percent - 100) / duration
    const profit = inputvalue * percentPerDay * 0.01 * duration
    const outputProfit = parseInt(inputvalue) + parseInt(profit) * 1
    return(
      <form action="" className={style.deposit__form_wrap}>
        <div className={style.deposit__inner_wrap}>
          <div className={style.deposit__form_top}>
            <h2>Вклад в {title}</h2>
            <span>Доходность: <b>{percentPerDay}% в день</b></span>
          </div>
          <div className={style.deposit__main}>
            <div className={style.deposit__input_wrap}>
              <label style={{width: '100%'}}>
                <h4 className={style.deposit__input_title}>Введите сумму депозита:</h4>
                <div className={style.deposit__input_container}>
                  <input 
                    type="text" 
                    className={style.deposit__input}
                    value={inputvalue} 
                    onChange={this.onChange} 
                    placeholder="Сумма 0.00"/>
                  <span className={style.deposit__icon_wrap}><i className={`fas fa-ruble-sign ${style.deposit__input_icon}`}></i></span>
                </div>
              </label>
              <span className={style.deposit__info}>Вы можете вложить от {amount_floor} до {amount_ceil}</span>
              <button type="submit" className={style.deposit__form_btn}>Создать депозит</button>
            </div>
            <h3 className={style.deposit__additionals_title}>Персональная информация по депозиту</h3>
            <div className={style.deposit__additionals_wrap}>
              <div className={style.deposit__additional_container}>
                <h5 className={style.deposit__additional_title}>Доход с депозита:</h5>
                <ul>
                  <li className={style.deposit__additional_item}>
                    <span>Сумма депозита</span>
                    <b>{inputvalue || 0} р.</b>
                  </li>
                  <li className={style.deposit__additional_item}>
                    <span>Начисленная прибыль (чистый доход)</span>
                    <b>{parseInt(profit) || 0} р.</b>
                  </li>
                  <li className={style.deposit__additional_item}>
                    <span>Сумма на выходе</span>
                    <b>{outputProfit || 0} р.</b>
                  </li>
                </ul>
              </div>
              <ul className={style.deposit__additional_container}>
                <li className={style.deposit__additional_item2}>
                  <span>Ставка:</span>
                  <b>{percentPerDay}% в день</b>
                </li>
                <li className={style.deposit__additional_item2}>
                  <span>Возврат депозита</span>
                  <b>В конце срока</b>
                </li>
                <li className={style.deposit__additional_item2}>
                  <span>Ограничение по количеству активных инвестиций:</span>
                  <b>Ограничения отсутствуют.</b>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    )
  }

  onChange = e => {
    if(!e.target.value.length) return this.setState({inputvalue: ''})
    else if(isNaN(parseInt(e.target.value))) return
    const {amount_ceil, amount_floor} = this.props
    const value = parseInt(e.target.value)
    if(value < amount_floor || value > amount_ceil) return
    this.setState({
      inputvalue: value
    })
  }
}

export default CoinForm
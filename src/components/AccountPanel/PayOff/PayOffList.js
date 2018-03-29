import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import style from '../../../pages/Account/style.styl'
import PayOffModal from './PayOffModal'
import Qiwi from '../../Icons/Qiwi'
import Cards from '../../Icons/Cards'
import Yandex from '../../Icons/Yandex'
import Paypal from '../../Icons/Paypal'
import Bit from '../../Icons/Bit'
import {createPayOff} from '../../../ducks/pay_off'

class PayOffList extends Component{
  state = {
    open: false,
    agregator: null,
    input: '',
    amount: '',
    comment: ''
  }

  render(){
    const {open, agregator, input, comment, amount} = this.state
    return(
      <div className={`${style.section} ${style.account__section}`}>
        <div className={style.section__top}>
          <h3 className={style.section__title}>Выберите платежную систему для вывода денежных средств:</h3>
        </div>
        <form action="" onSubmit={this.handleSubmit} className={style.section__container}>
          <PayOffModal 
            open={open} 
            input={input} 
            amount={amount} 
            comment={comment} 
            handleAmount={this.handleAmount}
            handleArea={this.handleArea}
            handleInput={this.handleInput}
            agregator={agregator} 
            handleClose={this.closeModal} />
          <ul className={style.payoff__list}>
            <li className={style.payoff__item}>
              <a href="" onClick={this.openModal('QW')} className={style.payoff__link}>
                <Qiwi height={100} color='#F09515'/>
                <h4 className={style.payoff__title}>QIWI WALLET</h4>
                <span className={style.payoff__info}>
                  &#10004; Коммисия за обработку: 0%
                </span>
                <span className={style.payoff__btn}>Создать заявку</span>
              </a>
            </li>
            <li className={style.payoff__item}>
              <a href="" onClick={this.openModal('BC')} className={style.payoff__link}>
                <Cards height={100} color='#059EE6'/>
                <h4 className={style.payoff__title}>Банковская карта</h4>
                <span className={style.payoff__info}>
                  &#10004; Коммисия за обработку: 0%
                </span>
                <span className={style.payoff__btn}>Создать заявку</span>
              </a>
            </li>
            <li className={style.payoff__item}>
              <a href="" onClick={this.openModal('YM')} className={style.payoff__link}>
                <Yandex height={100} color='#FF5C00'/>
                <h4 className={style.payoff__title}>Яндекс Деньги</h4>
                <span className={style.payoff__info}>
                  &#10004; Коммисия за обработку: 0%
                </span>
                <span className={style.payoff__btn}>Создать заявку</span>
              </a>
            </li>
            <li className={style.payoff__item}>
              <a href="" onClick={this.openModal('PP')} className={style.payoff__link}>
                <Paypal height={100} color='#0184E2'/>
                <h4 className={style.payoff__title}>Paypal кошелек</h4>
                <span className={style.payoff__info}>
                  &#10004; Коммисия за обработку: 0%
                </span>
                <span className={style.payoff__btn}>Создать заявку</span>
              </a>
            </li>
            <li className={style.payoff__item}>
              <a href="" onClick={this.openModal('CW')} className={style.payoff__link}>
                <Bit height={100} color='#F7931A'/>
                <h4 className={style.payoff__title}>На крипто кошелек</h4>
                <span className={style.payoff__info}>
                  &#10004; Коммисия за обработку: 0%
                </span>
                <span className={style.payoff__btn}>Создать заявку</span>
              </a>
            </li>
          </ul>
        </form>
      </div>
    )
  }

  handleSubmit = e => {
    e.preventDefault()

    const {createPayOff, user} = this.props
    const {agregator, input, amount, comment} = this.state
    console.log(agregator, input, amount, comment)

    if(agregator.length <= 0 || input.length <= 0 || amount.length <= 0) return
    createPayOff(user.id, amount, input, agregator, comment)
  }

  handleAmount = e => {
    this.setState({amount: e.target.value})
  }

	handleArea = e => {
		this.setState({comment: e.target.value})
	}

	handleInput = e => {
		this.setState({input: e.target.value})
	}

  openModal = (agregator) => e => {
    e.preventDefault()

    this.setState({agregator, open: true})
  }

  closeModal = e => {
    e.preventDefault()
    
    this.setState({open: false})
  }
}

export default connect(({payoff, auth}) => ({
  status: payoff.createPayoff,
  user: auth.user
}), {createPayOff})(PayOffList)
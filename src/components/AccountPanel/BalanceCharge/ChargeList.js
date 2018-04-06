import React, {Component} from 'react'
import {connect} from 'react-redux'

import style from '../../../pages/Account/style.styl'
import {fetchMerchant} from '../../../ducks/deposits'
import ChargeModal from './ChargeModal'
import Loader from '../../Loader'

class ChargeList extends Component{
  state = {
    open: false,
    agregator: '',
    amount: ''
  }

  componentDidMount() {
    const {fetchMerchant, loaded, error} = this.props
    if(!loaded) fetchMerchant()
  }

  render(){
    const {user, entities, loaded, error} = this.props
    const {amount, agregator, open} = this.state
    if(!loaded) return <Loader />
    else if(error) return <h1>Возникли проблемы при загрузке данных</h1>
    return(
      <div className={`${style.section} ${style.account__section}`}>
        <div className={style.section__top}>
          <h3 className={style.section__title}>Выберите платежную систему для вывода денежных средств:</h3>
        </div>
        <form method="post" onSubmit={this.handleSubmit} action="https://f-change.biz/merchant_pay" target="_blank" className={style.section__container}>
          <ChargeModal 
            open={open}
            getUSD={this.getUSD}
            agregator={agregator}
            input={amount} 
            handleClose={this.closeModal} 
            handleInput={this.handleAmount}
          />
          <ul className={style.payoff__list}>
            {entities.map(item => {
              const {
                max_summ, min_summ, obmen_curs, recive_paysys_icon, 
                recive_paysys_identificator, recive_paysys_title,
                recive_paysys_valute, send_paysys_icon, send_paysys_identificator,
                send_paysys_title, send_paysys_valute
              } = item
              return <li key={send_paysys_identificator} className={`${style.payoff__item} ${style.form__modal_item}`} >
                <a href="" onClick={this.openModal(send_paysys_identificator)} className={style.payoff__link}>
                  <img src={send_paysys_icon} style={{width: 50, marginBottom: 20}} />
                  <h4 className={style.payoff__title}>{send_paysys_title}</h4>
                  <span className={style.payoff__info}>
                    &#10004; Коммисия за обработку: 0%
                  </span>
                  <span className={style.payoff__btn}>Пополнить</span>
                </a>
              </li>
            })}
          </ul>
          <input type="hidden" name="user_id" value={user.id} />
          <input type="hidden" name="merchant_name" value="CryptoInvest" />
          <input type="hidden" name="merchant_title" value={`Пополнение счета в CryptoInvest Systems`} />
          <input type="hidden" name="payment_info" value={`Инвестирование в криптовалюты`} />
          <input type="hidden" name="payment_num" value={Date.now() + user.id} />
          <input type="hidden" name="sucess_url" value="https://cryptoinvest.systems/payment-success" />
          <input type="hidden" name="error_url" value="https://cryptoinvest.systems/payment-fail" />
        </form>
      </div>
        
    )
  }
  getUSD = (value) => {
    const curs = this.props.entities.filter(item => item.send_paysys_identificator == 'YAMRUB')[0].obmen_curs
    return value / curs
  }

  handleSubmit = e => {
    if(!this.state.amount.length) e.preventDefault()
  }

  handleAmount = e => {
    if(!isNaN(e.target.value)){
      this.setState({amount: e.target.value})
    }
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

export default connect(({deposits, auth}) => ({
  user: auth.user,
  entities: deposits.entities,
  loaded: deposits.loaded,
  error: deposits.error
}), {fetchMerchant})(ChargeList)
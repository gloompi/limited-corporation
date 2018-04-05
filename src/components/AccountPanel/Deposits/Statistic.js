import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import style from '../../../pages/Account/style.styl'
import {fetchDepositsAmount} from '../../../ducks/deposits'
import Loader from '../../Loader'

class Statistic extends Component{
  componentDidMount() {
    const {fetchDepositsAmount, statistic} = this.props
    if(!statistic) fetchDepositsAmount()
  }

  render(){
    const {statistic, user} = this.props
    if(!statistic) return <Loader />
    const {active_deposits, amount, deposits, payed_off} = statistic
    return(
			<div className={`${style.section__wrap} ${style.row}`}>
        <div className={`${style.section} ${style.account__section}`}>
          <div className={style.section__container}>
            <h4 className={style.deposit__balance_title}>Доступные средства:</h4>
            <div className={style.deposit__resource_info}>{user.account_resource} руб.</div>
            <p className={style.info}>Доступные средства - это сумма на вашем персональном балансе, которая доступна как для вывода так и для депозитирования</p>
          </div>
        </div>
        <div className={`${style.section} ${style.account__section}`}>
          <div className={style.section__top}>
            <h3 className={style.section__title}>Ваша финансовая статистика:</h3>
          </div>
          <div className={style.section__container}>
            <ul className={style.statistic__list}>
              <li className={style.statistic__item}>
                <div className={style.statistic__info}>
                  <div className={style.icon__wrap}>  
                    <i className="far fa-money-bill-alt"></i>
                  </div>
                  <div>
                    <h4 className={style.statistic__info_title}>Всего депозитов:</h4>
                    <span className={style.statistic__info_descr}>Общая сумма внесенных Вами средств в депозиты</span>
                  </div>
                </div>
                <span className={style.statistic__value} style={{backgroundColor: '#FF2830'}}>{deposits} руб.</span>
              </li>
              <li className={style.statistic__item}>
                <div className={style.statistic__info}>
                  <div className={style.icon__wrap}> 
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div>
                    <h4 className={style.statistic__info_title}>Всего выведено:</h4>
                    <span className={style.statistic__info_descr}>Общая сумма выведенных Вами средств</span>
                  </div>
                </div>
                <span className={style.statistic__value} style={{backgroundColor: '#FF3C7E'}}>{payed_off} руб.</span>
              </li>
              <li className={style.statistic__item}>
                <div className={style.statistic__info}>
                  <div className={style.icon__wrap}>
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <div>
                    <h4 className={style.statistic__info_title}>Активные депозиты:</h4>
                    <span className={style.statistic__info_descr}>Общая сумма всех активных депозитов</span>
                  </div>
                </div>
                <span className={style.statistic__value} style={{backgroundColor: '#37C936'}}>{active_deposits} руб.</span>
              </li>
              <li className={style.statistic__item}>
                <div className={style.statistic__info}>
                  <div className={style.icon__wrap}>
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div>
                    <h4 className={style.statistic__info_title}>Партнерская программа:</h4>
                    <span className={style.statistic__info_descr}>Общая сумма средств, заработаных по реферальной программе</span>
                  </div>
                </div>
                <span className={style.statistic__value} style={{backgroundColor: '#fe510d'}}>{amount} руб.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(({deposits, auth}) => ({
  user: auth.user,
  statistic: deposits.statistic
}), {fetchDepositsAmount})(Statistic)
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import style from '../../../pages/Account/style.styl'
import {fetchPayoffList} from '../../../ducks/pay_off'
import Loader from '../../Loader'

class PayHistory extends Component{
  componentDidMount() {
    const {loaded, fetchPayoffList} = this.props
    if(!loaded) fetchPayoffList()
  }
  render() {
    const {entities, loaded, error} = this.props
    if(!loaded) return <Loader />
    if(error) return <h1>Не удалось загрузить данные</h1>
    return(
      <div className={`${style.section} ${style.account__section}`}>
        <div className={style.section__top}>
          <h3 className={style.section__title}>Статус ваших заявок на вывод средств:</h3>
        </div>
        <div className={style.section__container}>
          <table className={`${style.table} ${style.payoff}`}>
            <thead>
              <tr>
                <th>Сумма</th>
                <th>Дата</th>
                <th>Платежная система</th>
                <th>Комментарий</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {entities.reverse().map(item => {
                const {id, agregator, amount, comment, date_added, status} = item
                return <tr key={id}>
                  <td>{amount} руб.</td>
                  <td>{date_added.slice(0, date_added.indexOf('T'))}</td>
                  <td>{this.getAgregator(agregator)}</td>
                  <td>{comment.slice(0, 20)} ...</td>
                  <td style={{color: status ? 'green' : '0c0c0c'}}>{status ? 'Оплачен' : 'В обработке'}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  getAgregator = (value) => {
    switch(value){
      case 'YM':
        return 'Yandex Money'

      case 'BC':
        return 'Visa/MasterCard'

      case 'QW':
        return 'Qiwi'

      case 'PP':
        return 'PayPal'

      case 'CW':
        return 'Crypto Wallet'

      default:
        return value
    }
  }
}

export default connect(({payoff}) => ({
  entities: payoff.entities.results,
  loaded: payoff.loaded,
  error: payoff.error
}), {fetchPayoffList})(PayHistory)
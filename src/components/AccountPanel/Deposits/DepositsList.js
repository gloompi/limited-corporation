import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ObjToImmArr} from '../../../helpers'

import style from '../../../pages/Account/style.styl'
import {fetchDeposits} from '../../../ducks/deposits'
import {fetchProfit} from '../../../ducks/profits'
import Loader from '../../Loader'

class DepositsList extends Component{
  componentDidMount() {
    const {profitsLoaded, loaded, fetchDeposits, fetchProfit} = this.props
    if(!loaded) fetchDeposits()
    if(!profitsLoaded) fetchProfit()
  }

  render(){
    const {deposits, profits, loaded, error, profitsLoaded} = this.props
    if(!loaded || !profitsLoaded) return <Loader />
    if(error) return <h1>Не удалось загрузить данные</h1>
    return(
      <div className={`${style.section} ${style.account__section}`}>
        <div className={style.section__top}>
          <h3 className={style.section__title}>Список открытых и закрытых депозитов:</h3>
        </div>
        <div className={style.section__container}>
          <table className={style.table}>
            <thead>
              <tr>
                <th>Дата депозита, окончания</th>
                <th>Вклад, %, Прибыль</th>
                <th>Период</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map(deposit => {
                const {amount, date_added, is_active, profit} = deposit
                const profitInfo = ObjToImmArr(profits).filter(item => item.id == profit)[0]
                const {percent, duration, pay_off} = profitInfo
                const date = new Date(Date.parse(date_added))
                return <tr key={date_added}>
                  <td>{date.toLocaleDateString()} - {new Date(date.setDate(date.getDate() + duration)).toLocaleDateString()}</td>
                  <td>{amount} руб - {amount * percent * 0.01} руб</td>
                  <td>{duration} дней</td>
                  <td style={{color: is_active && 'green'}}>{is_active ? 'Акивный' : 'Не активный'}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default connect(({deposits, profits}) => ({
  profitsLoaded: profits.loaded,
  profits: profits.entities,
  deposits: deposits.deposits,
  loaded: deposits.depositsLoaded,
  error: deposits.depositsError
}), {fetchDeposits, fetchProfit})(DepositsList)
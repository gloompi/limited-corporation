import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ObjToImmArr} from '../../../helpers'

import style from '../../../pages/Account/style.styl'
import {fetchChargeList} from '../../../ducks/charge'
import Loader from '../../Loader'

class ChargeHistory extends Component{
  componentDidMount() {
    const {loaded, fetchChargeList} = this.props
    if(!loaded) fetchChargeList()
  }

  render(){
    const {entities, loaded, error} = this.props
    if(!loaded) return <Loader />
    if(error) return <h1>Не удалось загрузить данные</h1>
    console.log(entities)
    return(
      <div className={`${style.section} ${style.account__section}`}>
        <div className={style.section__top}>
          <h3 className={style.section__title}>Список пополнений:</h3>
        </div>
        <div className={style.section__container}>
          <table className={style.table}>
            <thead>
              <tr>
                <th>Сумма</th>
                <th>Дата</th>
                <th>Платежная Система</th>
              </tr>
            </thead>
            <tbody>
              {entities.reverse().map(item => {
                const {amount, date_added, agregator} = item
                return <tr key={date_added}>
                  <td>{amount} руб</td>
                  <td>{date_added.slice(0, date_added.indexOf('T'))}</td>
                  <td>{agregator}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default connect(({charge}) => ({
  entities: charge.entities,
  loaded: charge.loaded,
  error: charge.error
}), {fetchChargeList})(ChargeHistory)
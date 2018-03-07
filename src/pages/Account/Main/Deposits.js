import React, {Component} from 'react'
import PropTypes from 'prop-types'

import style from '../style.styl'
import BreadCrumbs from '../../../components/AccountPanel/BreadCrumbs'
import DepositsList from '../../../components/AccountPanel/Deposits/DepositsList'
import Statistic from '../../../components/AccountPanel/Deposits/Statistic'

class Deposits extends Component{
  static propTypes = {
  }

  render(){
    return[
      <BreadCrumbs
        key={1}
        title='Список депозитов и финансовая статистика аккаунта'
        pathName='Список депозитов и статистика аккаунта' />,
      <div key={2} className={style.section__wrap}>
        <Statistic />
        <DepositsList />
      </div>
    ]
  }
}

export default Deposits
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {ObjToImmArr} from '../../../helpers'
import style from '../style.styl'
import BreadCrumbs from '../../../components/AccountPanel/BreadCrumbs'
import ChargeList from '../../../components/AccountPanel/BalanceCharge/ChargeList'
import Loader from '../../../components/Loader'

class Charge extends Component{
  static propTypes = {
  }

  render(){
    return [
      <BreadCrumbs 
        key={1}
        title='Список доступных тарифных планов для пополнения счета' 
        pathName='Пополнить счет' 
      />,
      <div key={2} className={style.deposit__wrap}>
        <ChargeList />
      </div>
    ]
  }
}

export default Charge
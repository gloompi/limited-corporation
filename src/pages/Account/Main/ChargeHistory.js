import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {ObjToImmArr} from '../../../helpers'
import style from '../style.styl'
import BreadCrumbs from '../../../components/AccountPanel/BreadCrumbs'
import ChargeHistory from '../../../components/AccountPanel/BalanceCharge/ChargeHistory'
import Loader from '../../../components/Loader'

class Charge extends Component{
  static propTypes = {
  }

  render(){
    return [
      <BreadCrumbs 
        key={1}
        title='История пополнений счета' 
        pathName='История пополнений' 
      />,
      <div key={2} className={style.deposit__wrap}>
        <ChargeHistory />
      </div>
    ]
  }
}

export default Charge
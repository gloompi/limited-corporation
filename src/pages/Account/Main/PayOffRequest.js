import React, {Component} from 'react'
import PropTypes from 'prop-types'

import style from '../style.styl'
import BreadCrumbs from '../../../components/AccountPanel/BreadCrumbs'
import PayOffList from '../../../components/AccountPanel/PayOff/PayOffList'

class PayOffRequest extends Component{
  static propTypes = {
  }

  render(){
    return[
      <BreadCrumbs
        key={1}
        title='Создать заявку на вывод средств'
        pathName='Вывести деньги' />,
      <div className={style.section__wrap}>
        <PayOffList />
      </div>
    ]
  }
}

export default PayOffRequest
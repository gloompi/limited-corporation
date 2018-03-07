import React, {Component} from 'react'
import PropTypes from 'prop-types'

import style from '../style.styl'
import BreadCrumbs from '../../../components/AccountPanel/BreadCrumbs'
import PayHistory from '../../../components/AccountPanel/PayOff/PayHistory'

class PayOffHistory extends Component{
  static propTypes = {
  }

  render(){
    return[
      <BreadCrumbs 
        key={1}
        title='История вывода финансовых средств'
        pathName='История вывода средств' />,
      <div key={2} className={style.section__wrap}>
        <PayHistory />
      </div>
    ]
  }
}

export default PayOffHistory
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import BreadCrumbs from '../../../components/AccountPanel/BreadCrumbs'

class PartnerStatistic extends Component{
  static propTypes = {
  }

  render(){
    return(
      <BreadCrumbs
        title='Статистика партнеров'
        pathName='Статистика партнеров' />
    )
  }
}

export default PartnerStatistic
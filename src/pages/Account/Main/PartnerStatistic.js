import React, {Component} from 'react'
import PropTypes from 'prop-types'

import BreadCrumbs from '../../../components/AccountPanel/BreadCrumbs'
import Partner from '../../../components/AccountPanel/PartnersProgramm/PartnersStatistic'

class PartnerStatistic extends Component{
  static propTypes = {
  }

  render(){
    return[
      <BreadCrumbs
        key={1}
        title='Статистика партнеров'
        pathName='Статистика партнеров' />,
      <Partner />
    ]
  }
}

export default PartnerStatistic
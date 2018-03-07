import React, {Component} from 'react'
import PropTypes from 'prop-types'

import BreadCrumbs from '../../../components/AccountPanel/BreadCrumbs'

class PartnerLinks extends Component{
  static propTypes = {
  }

  render(){
    return(
      <BreadCrumbs
        title='Партнерская программа'
        pathName='Партнерская программа' />
    )
  }
}

export default PartnerLinks
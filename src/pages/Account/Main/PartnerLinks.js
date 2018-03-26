import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ClipboardJS from 'clipboard'

import BreadCrumbs from '../../../components/AccountPanel/BreadCrumbs'
import Partners from '../../../components/AccountPanel/PartnersProgramm/PartnerLinks'

class PartnerLinks extends Component{
  static propTypes = {
  }

  componentDidMount() {
    new ClipboardJS('.copy__to_clipboard')
  }

  render(){
    return [
      <BreadCrumbs
        key={1}
        title='Партнерская программа'
        pathName='Партнерская программа' />,
      <Partners key={2} />
    ]
  }
}

export default PartnerLinks
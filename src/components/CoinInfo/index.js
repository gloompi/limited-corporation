import React, {Component} from 'react'
import PropTypes from 'prop-types'

import style from './style.styl'
import CoinDisplay from './CoinDisplay'
import CoinNavigate from './CoinNavigate'

class CoinInfo extends Component{
  static propTypes = {
  }

  render(){
    return(
      <div className={style.coininfo__wrap}>
        <CoinDisplay />
        <CoinNavigate />
      </div>
    )
  }
}

export default CoinInfo
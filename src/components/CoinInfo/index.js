import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import style from './style.styl'
import {ObjToImmArr} from '../../helpers'
import {fetchProfit} from '../../ducks/profits'
import CoinDisplay from './CoinDisplay'
import CoinNavigate from './CoinNavigate'
import Loader from '../Loader'

class CoinInfo extends Component{
  static propTypes = {
    fetchProfit: PropTypes.func.isRequired,
  }

  state = {
    activeCoin: 'BTC'
  }

  componentDidMount() {
    const {fetchProfit, loaded, error} = this.props
    if(!loaded && !error) fetchProfit()
  }

  render(){
    const {profits, loaded, error} = this.props
    const {activeCoin} = this.state
    if(!loaded) return <Loader />
    if(error) return <h1>Что то пошло не так!</h1>
    const profitList = ObjToImmArr(profits)
    const coin = profits.get(activeCoin)
    const {slug, title, percent, duration, amount_floor, amount_ceil, pay_off} = coin
    return(
      <form className={style.coininfo__wrap}>
        <CoinDisplay 
          slug={slug} 
          title={title} 
          percent={percent} 
          duration={duration} 
          amount_floor={amount_floor} 
          amount_ceil={amount_ceil} 
          pay_off={pay_off} />
        <CoinNavigate 
          activeCoin={activeCoin}
          slug={slug} 
          title={title} 
          percent={percent} 
          duration={duration} 
          amount_floor={amount_floor} 
          amount_ceil={amount_ceil} 
          pay_off={pay_off}
          profits={profitList}
          handleChange={this.handleChange} />
      </form>
    )
  }

  handleChange = value => e => {
    this.setState({
      activeCoin: value
    })
  }
}

export default connect(state => ({
  profits: state.profits.entities,
  loaded: state.profits.loaded,
  error: state.profits.error
}), {fetchProfit})(CoinInfo)
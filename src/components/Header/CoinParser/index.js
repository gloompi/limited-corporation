import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {modulName, fetchCurrency} from '../../../ducks/currency'

import style from '../style.styl'
import Loader from '../../Loader'
import Bit from '../../Icons/Bit'
import Dash from '../../Icons/Dash'
import Etherium from '../../Icons/Etherium'
import Lite from '../../Icons/Lite'
import Ripple from '../../Icons/Ripple'

class CoinParser extends Component{
  static propTypes = {
    fetchCurrency: PropTypes.func.isRequired,
    currency: PropTypes.object.isRequired,
    loaded: PropTypes.any,
    error: PropTypes.any
  }

  state = {
    open: false
  }

  componentDidMount() {
    const {fetchCurrency, loaded, error} = this.props
    if(!loaded && !error) fetchCurrency('BTC')
    document.addEventListener('click', (e) => {
      if(e.target.className != style.coin__wrap && e.target.parentNode.className != style.coin__wrap){
        if(e.target.className != style.coin__display && e.target.parentNode.className != style.coin__display && this.state.open) {
          this.setState({ open: false })
        }
      }
    })
  }

  render(){
    const {currency, error, loaded} = this.props
    const {open} = this.state
    const coinsList = ['BTC', 'LTC', 'ETH', 'DASH', 'XRP']
    if(!loaded) return <Loader width={50} />
    if(error) return <h3>Что то пошло не так!</h3>
    const coinName = Object.keys(currency)[0]
    let coinPrice = 1/currency[coinName]+''
    coinPrice = coinPrice.slice(0, coinPrice.indexOf('.') + 3)
    return(
      <div className={style.coin__wrap}>
        <a href="" className={style.coin__display} onClick={this.handleOpen}>
          <h3>{`${coinName} - $ ${coinPrice}`}</h3>
          <i className="fas fa-angle-down"></i>
        </a>
        <ul className={`${style.coin__list} ${open && style.active}`}>
          {coinsList.map(coin => {
            return <li key={coin} className={style.coin__item}>
              <a 
                href="" 
                className={style.coin__link} 
                onClick={this.handleClick(coin)}>
                  {this.getCoinName(coin)}
              </a>
            </li>
          })}
        </ul>
      </div>
      
    )
  }

  getCoinName = coin => {
    switch(coin){
      case 'BTC':
        return [
          <Bit color='#FF2830' key={1} height={20} />,
          <span key={2}>BitCoin</span>]

      case 'LTC':
        return [
          <Lite color='#FF2830' key={1} height={20} />,
          <span key={2}>LiteCoin</span>]

      case 'ETH':
        return [
          <Etherium color='#FF2830' key={1} height={20} />,
          <span key={2}>Etherium</span>]

      case 'DASH':
        return [
          <Dash color='#FF2830' key={1} height={20} />,
          <span key={2}>DigitalCash</span>]

      case 'XRP':
        return [
          <Ripple color='#FF2830' key={1} height={20} />,
          <span key={2}>Ripple</span>]

      default:
        return coin
    }
  }

  handleOpen = e => {
    e.preventDefault()

    this.setState({
      open: !this.state.open
    })
  }

  handleClick = (coin) => e => {
    const {fetchCurrency} = this.props
    e.preventDefault()
    
    fetchCurrency(coin)
    this.setState({
      open: false
    })
  }
}

export default connect(state => ({
  currency: state.currency.currency,
  error: state.currency.error,
  loaded: state.currency.loaded
}), {fetchCurrency})(CoinParser)
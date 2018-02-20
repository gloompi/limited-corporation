import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {modulName, fetchCurrency} from '../../../ducks/currency'

import style from '../style.styl'
import Loader from '../../Loader'

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
        return 'BitCoin'

      case 'LTC':
        return 'LiteCoin'

      case 'ETH':
        return 'Etherium'

      case 'DASH':
        return 'DigitalCash'

      case 'XRP':
        return 'Ripple'

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
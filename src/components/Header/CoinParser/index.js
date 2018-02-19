import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {modulName, fetchCurrency} from '../../../ducks/currency'

import Loader from '../../Loader'

class CoinParser extends Component{
  static propTypes = {
    fetchCurrency: PropTypes.func.isRequired,
    currency: PropTypes.object.isRequired,
    loaded: PropTypes.any,
    error: PropTypes.any
  }

  componentDidMount() {
    const {fetchCurrency, loaded, error} = this.props
    if(!loaded && !error) fetchCurrency('BTC')
  }

  render(){
    const {currency, error, loaded} = this.props
    if(!loaded) return <Loader width={50} />
    if(error) return <h3>Что то пошло не так!</h3>
    const {BTC} = currency.data
    console.log(currency.data)
    return(
      <h1>{BTC}</h1>
    )
  }
}

export default connect(state => ({
  currency: state.currency.currency,
  error: state.currency.error,
  loaded: state.currency.loaded
}), {fetchCurrency})(CoinParser)
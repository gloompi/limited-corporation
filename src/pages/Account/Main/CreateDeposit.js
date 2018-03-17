import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {ObjToImmArr} from '../../../helpers'
import {fetchProfit} from '../../../ducks/profits'
import style from '../style.styl'
import BreadCrumbs from '../../../components/AccountPanel/BreadCrumbs'
import CoinNavigate from '../../../components/AccountPanel/CreateDeposit/CoinNavigate'
import CoinForm from '../../../components/AccountPanel/CreateDeposit/CoinForm'
import Loader from '../../../components/Loader'

class CreateDeposit extends Component{
  static propTypes = {
  }

  state = {
    activeCoin: 'LTC'
  }

  componentDidMount() {
    const {fetchProfit, loaded, error} = this.props
    if(!loaded) fetchProfit()
  }

  render(){
    const {profits, loaded, error} = this.props
    const {activeCoin} = this.state
    if(!loaded) return <Loader />
    if(error) return <h1>Что то пошло не так!</h1>
    const profitList = ObjToImmArr(profits)
    const coin = profits.get(activeCoin)
    return [
      <BreadCrumbs 
        key={1}
        title='Список доступных тарифных планов для создания депозита' 
        pathName='Создать депозит' 
      />,
      <div key={2} className={style.deposit__wrap}>
        <h3 className={style.deposit__title}>Выберите валюту</h3>
        <div className={style.deposit__content}>
          <CoinNavigate profits={profitList} activeCoin={activeCoin} handleChange={this.handleChange} />
          <CoinForm coin={coin} />
        </div>
      </div>
    ]
  }

  handleChange = value => e => {
    e.preventDefault()
    this.setState({
      activeCoin: value
    })
  }
}

export default connect(state => ({
  profits: state.profits.entities,
  loaded: state.profits.loaded,
  error: state.profits.error
}), {fetchProfit})(CreateDeposit)
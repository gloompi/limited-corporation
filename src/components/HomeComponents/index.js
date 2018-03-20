import React, {Component} from 'react'
import PropTypes, { func } from 'prop-types'

import style from './style.styl'
import About from './About'
import Statistic from './Statistic'
import PartnerProgram from './PartnerProgram'
import ProfitPath from './ProfitPath'
import {name} from '../../nicknames'
import {investors, total, payedoff, holded} from '../../../configClient'

class HomeComponents extends Component{
  state = {
    payoff_users: [],
    holding_users: [],
    investors: 894,
    total: 1352,
    payedoff: 9475145,
    holded: 18930609
  }

  componentDidMount() {
    const payoff_users = []
    const holding_users = []
    const localTotal = localStorage.getItem(total)
    const localInvestors = localStorage.getItem(investors)
    const localPayedoff = localStorage.getItem(payedoff)
    const localHolded = localStorage.getItem(holded)

    if(localHolded) this.setState({holded: parseInt(localHolded)})
    else localStorage.setItem(holded, this.state.holded)
    if(localInvestors) this.setState({investors: parseInt(localInvestors)})
    else localStorage.setItem(investors, this.state.investors)
    if(localPayedoff) this.setState({payedoff: parseInt(localPayedoff)})
    else localStorage.setItem(payedoff, this.state.payedoff)
    if(localTotal) this.setState({total: parseInt(localTotal)})
    else localStorage.setItem(total, this.state.total)

    for(let i=0; i<6; i++){
      let user = {name: name(), sum: Math.ceil(Math.random() * 3000) + 100 + '0', country: Math.ceil(Math.random() * 4)}
      let hold_user = {name: name(), sum: Math.ceil(Math.random() * 3000) + 100 + '0', country: Math.ceil(Math.random() * 4)}
      payoff_users.push(user)
      holding_users.push(hold_user)
    }
    
    this.setState({payoff_users, holding_users})
    setInterval(() => {
      localStorage.setItem(investors, parseInt(this.state.investors) + 1)
      return this.setState({investors: parseInt(this.state.investors) + 1})
    }, 20000)
    setInterval(loopPayoff.bind(this), 15000)
    setInterval(loopHolding.bind(this), 5000)

    function loopPayoff(){
      setTimeout(() => {
        let sum = Math.ceil(Math.random() * 3000) + 100 + '0'
        let user = {name: name(), sum, country: Math.ceil(Math.random() * 4)}
  
        payoff_users.pop()
        payoff_users.unshift(user)
        localStorage.setItem(total, parseInt(this.state.total) - 1)
        localStorage.setItem(payedoff, parseInt(this.state.payedoff) + parseInt(sum))
        this.setState({payoff_users, total: parseInt(this.state.total) - 1, payedoff: parseInt(this.state.payedoff) + parseInt(sum)})
      }, Math.random() * 5000)
    }
    function loopHolding(){
      setTimeout(() => {
        let sum = Math.ceil(Math.random() * 3000) + 100 + '0'
        let user = {name: name(), sum, country: Math.ceil(Math.random() * 4)}

        holding_users.pop()
        holding_users.unshift(user)
        localStorage.setItem(total, parseInt(this.state.total) + 1)
        localStorage.setItem(holded, parseInt(this.state.holded) + parseInt(sum))
        this.setState({holding_users, total: parseInt(this.state.total) + 1, holded: parseInt(this.state.holded) + parseInt(sum)})
      }, Math.random() * 10000)
    }
  }

  render(){
    const {holding_users, payoff_users, investors, payedoff, holded, total} = this.state
    return(
      <div>
        <About />
        <Statistic 
          total={total} 
          holded={holded} 
          payedoff={payedoff} 
          investors={investors}
          holding_users={holding_users} 
          payoff_users={payoff_users} />
        <PartnerProgram />
        <ProfitPath />
      </div>
    )
  }
}

export default HomeComponents
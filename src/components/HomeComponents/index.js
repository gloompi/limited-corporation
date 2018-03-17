import React, {Component} from 'react'
import PropTypes, { func } from 'prop-types'

import style from './style.styl'
import About from './About'
import Statistic from './Statistic'
import PartnerProgram from './PartnerProgram'
import ProfitPath from './ProfitPath'
import {name} from '../../nicknames'

class HomeComponents extends Component{
  static propTypes = {
  }

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
    for(let i=0; i<6; i++){
      let user = {name: name(), sum: Math.ceil(Math.random() * 3000) + 100 + '0', country: Math.ceil(Math.random() * 4)}
      let hold_user = {name: name(), sum: Math.ceil(Math.random() * 3000) + 100 + '0', country: Math.ceil(Math.random() * 4)}
      payoff_users.push(user)
      holding_users.push(hold_user)
    }
    
    this.setState({payoff_users, holding_users})
    setInterval(this.setState({investors: this.state.investors + 1}), 5000)
    setInterval(loop.bind(this), 5000)

    function loop(){
      setTimeout(() => {
        let sum = Math.ceil(Math.random() * 3000) + 100 + '0'
        let user = {name: name(), sum, country: Math.ceil(Math.random() * 4)}
  
        payoff_users.pop()
        payoff_users.unshift(user)
        this.setState({payoff_users, total: this.state.total - 1, payedoff: this.state.payedoff + parseInt(sum)})
      }, Math.random() * 5000)
  
      setTimeout(() => {
        let sum = Math.ceil(Math.random() * 3000) + 100 + '0'
        let user = {name: name(), sum, country: Math.ceil(Math.random() * 4)}
  
        holding_users.pop()
        holding_users.unshift(user)
        this.setState({holding_users, total: this.state.total + 1, holded: this.state.holded + parseInt(sum)})
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
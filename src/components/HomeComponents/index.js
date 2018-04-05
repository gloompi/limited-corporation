import React, {Component} from 'react'
import PropTypes from 'prop-types'

import style from './style.styl'
import About from './About'
import Statistic from './Statistic'
import PartnerProgram from './PartnerProgram'
import ProfitPath from './ProfitPath'
import {ws} from '../../../configClient'

class HomeComponents extends Component{
  state = {
    loaded: false,
    payoff_users: [],
    holding_users: [],
    investors: 0,
    total: 0,
    payedoff: 0,
    holded: 0
  }

  // componentDidMount() {
  //   this.socket = new WebSocket(ws)
  //   const {socket} = this
  //   if(socket){
  //     socket.onmessage = (msg) => {
  //       const data = JSON.parse(msg.data)
  //       const {payoff_users, holding_users, total, investors, payedoff, holded} = data
  //       this.setState({
  //         holded, payedoff, total, investors,
  //         holding_users, payoff_users
  //       })
  //       if(!this.state.loaded) this.setState({loaded: true})
  //     }
  //   }
  // }

  // componentWillUnmount() {
  //   if(this.socket) this.socket.close()
  // }

  render(){
    const {loaded, holding_users, payoff_users, investors, payedoff, holded, total} = this.state
    return(
      <div>
        <About />
        <Statistic 
          loaded={loaded}
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
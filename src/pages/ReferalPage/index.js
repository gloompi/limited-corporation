import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Loader from '../../components/Loader'
class ReferalPage extends Component{
  componentDidMount() {
    const {username} = this.props.match.params
    localStorage.setItem('partner_name', username)
    this.props.history.replace('/sign-up')
  }
  render(){
    return <Loader />
  }
}

export default ReferalPage
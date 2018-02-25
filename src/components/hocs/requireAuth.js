import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {jwtSecretName} from '../../../configClient'

export default (ChildComponent) => {
  class RequireAuth extends Component {
    state = {
      token: null
    }

    componentDidMount() {
      const token = localStorage.getItem(jwtSecretName)
      if(!token) return this.props.history.push('/sign-in')
      else if(token) return this.setState({token})
    }

    componentWillReceiveProps(nextProps) {
      const token = localStorage.getItem(jwtSecretName)
      console.log('next', nextProps)
      if(token) return this.setState({token})
      else if(!token) return this.props.history.push('/sign-in')
    }

    render() {
      const {token} = this.state
      switch(token) {
        case null:
          return <div>Loading...</div>
        default:
          return <ChildComponent {...this.props} {...this.state} />
      }
    }
  }

  return RequireAuth
}
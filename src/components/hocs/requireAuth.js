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
      console.log(localStorage, token)
      if(token) return this.setState({token})
    }

    render() {
      const {token} = this.state
      console.log('token---', token)
      switch(token) {
        case false:
          return <Redirect to="/sign-in" />
        case null:
          return <div>Loading...</div>
        default:
          return <ChildComponent {...this.props} {...this.state} />
      }
    }
  }

  return RequireAuth
}
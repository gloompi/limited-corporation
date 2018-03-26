import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
import {Helmet} from 'react-helmet'

import style from './style.styl'
import '../../assets/js/fontawesome-all.min.js'
import {fetchUser} from '../../ducks/auth'
import {jwtSecretName} from '../../../configClient'
import requireAuth from '../../components/hocs/requireAuth'
import SideBar from '../../components/AccountPanel/SideBar'
import icon from '../../assets/images/logo-pic.ico'
import SettingsModal from '../../components/AccountPanel/Modals/SettingsModal'
import ContactsModal from '../../components/AccountPanel/Modals/ContactsModal'

class Account extends Component{
  state = {
    settings: false,
    contacts: false
  }

  componentDidMount() {
    const {fetchUser, loaded} = this.props
    const userName = localStorage.getItem('userName')
    if(!loaded) fetchUser(userName)
  }

  render(){
    const {user, route, history} = this.props
    const {settings, contacts} = this.state
    const {openSettings, openContacts, closeSettings, closeContacts} = this
    return(
      <div className={`${style.wrapper} ${style.account__wrapper}`}>
        <Helmet>
          <link rel="icon" type="image/ico" sizes="32x32" href={icon} />
          <link rel="icon" type="image/ico" sizes="16x16" href={icon} />
        </Helmet>
        <SettingsModal open={settings} handleClose={this.closeSettings}  />
        <ContactsModal open={contacts} handleClose={this.closeContacts} />
        <SideBar history={history} openSettings={openSettings} closeSettings={closeSettings} />
        {renderRoutes(route.routes, {openSettings, openContacts, closeSettings, closeContacts})}
      </div>
    )
  }

  openSettings = e => {
    e.preventDefault()

    this.setState({
      settings: true
    })
  }

  openContacts = e => {
    e.preventDefault()

    this.setState({
      contacts: true
    })
  }

  closeSettings = e => {
    e.preventDefault()

    this.setState({
      settings: false
    })
  }

  closeContacts = e => {
    e.preventDefault()

    this.setState({
      contacts: false
    })
  }
}

export default connect(state => ({
  loaded: state.auth.userLoaded
}), {fetchUser})(requireAuth(Account))
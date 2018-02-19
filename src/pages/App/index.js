import React from 'react'
import {renderRoutes} from 'react-router-config'
import {NavLink} from 'react-router-dom'

import Header from '../../components/Header'

const App = ({ route }) => {
  return <div>
    <Header />
    {renderRoutes(route.routes)}
  </div>
}

export default App
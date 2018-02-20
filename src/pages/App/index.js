import React from 'react'
import {renderRoutes} from 'react-router-config'
import {NavLink} from 'react-router-dom'

import style from './style.styl'
import '../../assets/js/fontawesome-all.min.js'

import Header from '../../components/Header'

const App = ({ route }) => {
  return <div className={style.app}>
    <Header />
    <main className={style.app__main}>
      {renderRoutes(route.routes)}
    </main>
  </div>
}

export default App
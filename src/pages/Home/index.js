import React, {Component} from 'react'
import PropTypes from 'prop-types'

import style from './style.styl'

class Home extends Component{
  static propTypes = {
  }

  render(){
    return(
      <div>
        <h1 className={style.Home}>Home</h1>
      </div>
    )
  }
}

export default Home
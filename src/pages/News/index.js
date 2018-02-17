import React, {Component} from 'react'
import PropTypes from 'prop-types'

import style from './style.styl'

class News extends Component{
  static propTypes = {
  }

  render(){
    return(
      <h1 className={style.h1}>News Page</h1>
    )
  }
}

export default News
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import style from './style.styl'

class Home extends Component{
  static propTypes = {
  }

  render(){
    return(
      <div className={style.wrapper}>
        <div className={`${style.container} ${style.home__wrap}`}>
          <h1 className={style.home__title}>Инвестиции в криптовалюты</h1>
          <div className={style.home__longtitle}>Инвестировать в криптовалюты - это просто.</div>
        </div>
      </div>
    )
  }
}

export default Home
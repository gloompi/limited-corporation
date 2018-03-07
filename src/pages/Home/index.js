import React, {Component} from 'react'
import PropTypes from 'prop-types'

import style from './style.styl'
import {scrollIt} from '../../helpers'
import CoinInfo from '../../components/CoinInfo'
import HomeComponents from '../../components/HomeComponents'

class Home extends Component{
  static propTypes = {
  }

  render(){
    return(
      <div className={style.wrapper}>
        <section className={`${style.container} ${style.home__wrap}`}>
          <h1 className={style.home__title}>Инвестиции в криптовалюты</h1>
          <div className={style.home__longtitle}>Инвестировать в криптовалюты - это просто.</div>
          <CoinInfo />
          <a href="" className={style.scroll__btn} onClick={this.handleScroll}>
            <div className={style.mouse}>
              <span className={style.dot}></span>
            </div>
            <i className="fas fa-angle-down"></i>
          </a>
        </section>
        <HomeComponents />
      </div>
    )
  }

  handleScroll = e => {
    e.preventDefault()

    scrollIt(document.getElementById('point'), 150)
  }
}

export default Home
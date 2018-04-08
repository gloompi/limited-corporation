import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import style from '../style'

class Footer extends Component{
  render(){
    return(
      <footer className={style.footer}>
        <div>Copyright © 2018 <b>Cryptoinvest.systems</b>. Все права защищены.</div>
        <ul className={style.footer__list}>
          <li className={style.footer__item}><Link to="/">Главная</Link></li>
          <li className={style.footer__item}><Link to="/agreement">Клиентское соглашение</Link></li>
        </ul>
      </footer>
    )
  }
}

export default Footer
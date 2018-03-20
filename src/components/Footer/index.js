import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

import style from './style'
import {fetchNews} from '../../ducks/news'
import {createMarkup} from '../../helpers'
import Loader from '../Loader'

class Footer extends Component{
  static propTypes = {
  }

  componentDidMount() {
    const {fetchNews, loaded} = this.props
    if(!loaded) fetchNews()
  }

  render(){
    const {news, loaded} = this.props
    if(!loaded) return <Loader /> 
    return(
      <footer className={style.footer}>
        <div className={`${style.container} ${style.footer__container}`}>
          <ul className={style.footer__top}>
            <li className={style.footer__top_item}>
              <Link to="/">
                <div className={style.logo}>
                  <img src={require('../../assets/images/logo-pic.png')} alt="logo"/>
                  <div>
                    <h3>Cryproinvest.systems</h3>
                    <span>Future starts today</span>
                  </div>
                </div>
              </Link>
              <span className={style.footer__top_descr}>Cryproinvest.systems - платформа, позволяющая зарабатывать на инвестициях в 5 биржевых активов: LiteCoin, Dash, Ethereum, Ripple и BitCoin.</span>
            </li>
            <li className={style.footer__top_item}>
              <h2 className={style.footer__top_title}>Последние новости</h2>
              <ul className={style.footer__news_list}>
                {news
                  .slice(0, 2)
                  .map(item => {
                    const {title, announce, date_added, slug} = item
                    const date = new Date(date_added)
                    const day = date.getDate()
                    const month = date.getMonth() + 1
                    return <li key={slug} className={style.footer__news_item}>
                      <Link to={`/news/${slug}`}>
                        <div className={style.footer__top_date_wrap}>
                          <span className={style.day}>{day < 9 ? `0${day}` : day}</span>
                          <span className={style.month}>{month < 9 ? `0${month}` : month}</span>
                        </div>
                        <div className={style.footer__news_txt}>
                          <h3 className={style.title}>{title}</h3>
                          <div className={style.text} dangerouslySetInnerHTML={createMarkup(announce.slice(0, 150))} />
                        </div>
                      </Link>
                    </li>
                })}
              </ul>
            </li>
            <li className={style.footer__top_item}>
              <h2 className={style.footer__top_title}>Обратная связь</h2>
              <ul className={style.footer__news_list}>
                <li className={style.footer__news_item}>
                  <a href="mailto: support@cryptoinvest.systems">
                    <div className={style.footer__top_icon_wrap}><i className="fas fa-envelope"></i></div>
                    <div className={style.footer__top_contacts}>
                      <span>Оффлайн поддержка</span>
                      <b>support@cryptoinvest.systems</b>
                    </div>
                  </a>
                </li>
                <li className={style.footer__news_item}>
                  <a href="tel: 8-800-511-03-82">
                    <div className={style.footer__top_icon_wrap}><i className="fas fa-phone"></i></div>
                    <div className={style.footer__top_contacts}>
                      <span>Центр поддержки</span>
                      <b>8-800-511-03-82</b>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul className={style.footer__middle}>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-2.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-3.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-4.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-5.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-8.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-9.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-10.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-11.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-12.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-13.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-14.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-15.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-16.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-18.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-19.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-20.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-21.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-22.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-23.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-25.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-26.svg")} alt="icon"/></li>
            <li className={style.footer__middle_item}><img src={require("../../assets/images/payststem-27.svg")} alt="icon"/></li>
          </ul>
          <div className={style.footer__bottom}>
            <div>
              <p>© 2018 Cryproinvest.systems. Все права защищены.</p>
              <p>ООО «Дабл Ю коммуникэйшен» ОГРН: 1127746328731 ИНН: 7716715161</p>
            </div>
            <nav className={style.mnu__list}>
              <li className={style.mnu__item}>
                <NavLink 
                  to="/about" 
                  className={style.mnu__link} >
                    О компании
                </NavLink>
              </li>
              <li className={style.mnu__item}>
                <NavLink 
                  to="/for-investors" 
                  className={style.mnu__link} >
                    Инвесторам
                </NavLink>
              </li>
              <li className={style.mnu__item}>
                <NavLink 
                  to="/for-partners" 
                  className={style.mnu__link} >
                    Партнерам
                </NavLink>
              </li>
              <li className={style.mnu__item}>
                <NavLink 
                  to="/faq" 
                  className={style.mnu__link} >
                    FAQ
                </NavLink>
              </li>
              <li className={style.mnu__item}>
                <NavLink 
                  to="/contacts" 
                  className={style.mnu__link} >
                    Контакты
                </NavLink>
              </li>
              <li className={style.mnu__item}>
                <NavLink 
                  to="/agreement" 
                  className={style.mnu__link} >
                    Соглашение
                </NavLink>
              </li>
            </nav>
          </div>
          <a href="" className={style.footer__scroll_btn} onClick={this.handleScroll}>
            <span className={style.footer__scroll_inner}>
              <i className="fas fa-angle-up"></i>
            </span>
          </a>
        </div>
      </footer>
    )
  }

  handleScroll = e => {
    e.preventDefault()

    window.scrollTo({
      'behavior': 'smooth',
      'left': 0,
      'top': 0
    })
  }
}

export default connect(state => ({
  news: state.news.entities,
  loaded: state.news.loaded
}), {fetchNews})(Footer)
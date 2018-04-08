import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import style from './style.styl'
import Loader from '../../components/Loader'
import {fetchNews} from '../../ducks/news'
import {createMarkup, httpChanger} from '../../helpers'

class News extends Component{
  static propTypes = {
  }

  componentDidMount() {
    const {fetchNews, loaded} = this.props
    if(!loaded) fetchNews()
  }

  render(){
    const {loaded, news} = this.props
    if(!loaded) return <Loader />
    return(
      <div className={style.section}>
        <div className={`${style.container} ${style.section__container}`}>
          <div className={style.section__icon}>
            <i className="fas fa-newspaper"></i>
          </div>
          <h2 className={style.section__title}>Новости</h2>
          <span className={style.section__longtitle}>Все новости компании</span>
          <ul className={style.news__list}>
            {news.map(item => {
                const {slug, title, cover_picture, announce} = item
                return <li key={slug} className={style.news__item}>
                  <Link to={`/news/${slug}`} className={style.news__link}>
                    <h3 className={style.news__title}>{title}</h3>
                    {cover_picture && <img src={httpChanger(cover_picture)} alt="cover picture"/>}
                    <div className={style.news__descr} dangerouslySetInnerHTML={createMarkup(announce)} />
                  </Link>
                </li>
              })}
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(state =>({
  news: state.news.entities,
  loaded: state.news.loaded
}), {fetchNews})(News)
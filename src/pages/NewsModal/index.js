import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import style from './style.styl'
import Loader from '../../components/Loader'
import {fetchNewsItem} from '../../ducks/news'
import {createMarkup, httpChanger} from '../../helpers'

class NewsModal extends Component{
  static propTypes = {
  }

  componentDidMount() {
    const {fetchNewsItem, loaded, newsItem, match} = this.props
    const {slug} = match.params
    fetchNewsItem(slug)
  }
  
  componentWillReceiveProps(nextProps) {
    const {fetchNewsItem, loaded, newsItem, match} = nextProps
    const {slug} = match.params
    if(newsItem && newsItem.slug !== slug) fetchNewsItem(slug)
  }

  render(){
    const {loaded, newsItem, match} = this.props
    if(!loaded || !newsItem || newsItem.slug !== match.params.slug) return <Loader />
    const {title, cover_picture, content, date_added} = newsItem
    return(
      <div className={style.section}>
        <div className={`${style.container} ${style.section__container}`}>
          <h2 className={style.newsitem__title}>{title}</h2>
          <div className={style.newsitem__pic_wrap}><img src={httpChanger(cover_picture)} alt="cover pic"/></div>
          <div className={style.newsitem__pic_content} dangerouslySetInnerHTML={createMarkup(content)}></div>
          <div className={style.newsitem__date}>{date_added.slice(0, date_added.indexOf('T'))}</div>
        </div>
      </div>
    )
  }
}

export default connect(state =>({
  newsItem: state.news.newsItem,
  loaded: state.news.loaded
}), {fetchNewsItem})(NewsModal)
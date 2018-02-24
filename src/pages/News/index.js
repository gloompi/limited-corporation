import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import style from './style.styl'

import {fetchNews} from '../../ducks/news'

class News extends Component{
  static propTypes = {
  }

  componentDidMount() {
    const {fetchNews, loaded} = this.props
    if(!loaded) fetchNews()
  }

  render(){
    const {loaded, news} = this.props
    if(loaded) console.log(news)
    return(
      <h1 className={style.h1}>News Page</h1>
    )
  }
}

export default connect(state =>({
  news: state.news.entities,
  loaded: state.news.loaded
}), {fetchNews})(News)
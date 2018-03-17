import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import style from './style'
import {fetchAbout} from '../../ducks/about'
import {createMarkup} from '../../helpers'
import Loader from '../../components/Loader'

class About extends Component{
  static propTypes = {
  }

  componentDidMount() {
    const {fetchAbout, loaded} = this.props
    if(!loaded) fetchAbout()
  }

  render(){
    const {about, loaded} = this.props
    if(!loaded) return <Loader />
    return(
      <div className={style.wrapper}>
        <section className={style.section}>
          <div className={`${style.container} ${style.section__container}`}>
            <div className={style.section__icon}>
              <i className="fas fa-newspaper"></i>
            </div>
            <h2 className={style.section__title}>О компании</h2>
            <div className={style.content} dangerouslySetInnerHTML={createMarkup(about.content)}></div>
          </div>
        </section>
      </div>
    )
  }
}

export default connect(state => ({
  about: state.about.content,
  loaded: state.about.loaded
}), {fetchAbout})(About)
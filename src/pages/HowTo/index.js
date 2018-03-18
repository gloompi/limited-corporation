import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import style from './style'
import {fetchGuide} from '../../ducks/howToStart'
import {createMarkup} from '../../helpers'
import Loader from '../../components/Loader'

class About extends Component{
  static propTypes = {
  }

  componentDidMount() {
    const {fetchGuide, loaded} = this.props
    if(!loaded) fetchGuide()
  }

  render(){
    const {entities, loaded} = this.props
    if(!loaded) return <Loader />
    return(
      <div className={style.wrapper}>
        <section className={style.section}>
          <div className={`${style.container} ${style.section__container}`}>
            <div className={style.section__icon}>
              <i className="fas fa-newspaper"></i>
            </div>
            <h2 className={style.section__title}>Как начать?</h2>
            <ul className={style.guide__list}>
              {entities.map(item => {
                const {title, cover_pic, content} = item
                return <li key={title} className={style.guide__item}>
                  <div className={style.guide__pic_wrap}><img src={cover_pic && cover_pic.replace(/http/i, 'https')} alt="pic"/></div>
                  <div className={style.guide__content}>
                    <h3 className={style.guide__title}>{title}</h3>
                    <div className={style.guide__descr} dangerouslySetInnerHTML={createMarkup(content)}></div>
                  </div>
                </li>
              })}
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

export default connect(state => ({
  entities: state.howToStart.entities,
  loaded: state.howToStart.loaded
}), {fetchGuide})(About)
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import style from './style'
import {fetchForPartners} from '../../ducks/forPartners'
import {createMarkup} from '../../helpers'
import Loader from '../../components/Loader'
import Procents from '../../components/HomeComponents/Procents'

class ForPartners extends Component{
  static propTypes = {
  }

  componentDidMount() {
    const {fetchForPartners, loaded} = this.props
    if(!loaded) fetchForPartners()
  }

  render(){
    const {item, loaded} = this.props
    if(!loaded) return <Loader />
    const {title, cover_pic, content} = item
    return(
      <div className={style.wrapper}>
        <section className={style.section}>
          <div className={`${style.container} ${style.section__container}`}>
            <div className={style.section__icon}>
              <i className="fas fa-newspaper"></i>
            </div>
            <h2 className={style.section__title}>Партнерам</h2>
            <Procents />
            <div className={style.partners__wrap}>
              <div className={style.partners__content}>
                <h3 className={style.partners__title}>{title}</h3>
                <div className={style.partners__descr} dangerouslySetInnerHTML={createMarkup(content)}></div>
              </div>
              <div className={style.partners__pic_wrap}>
                <img src={cover_pic && cover_pic.replace(/http/i, 'https')} alt="pic"/>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default connect(state => ({
  item: state.forPartners.item,
  loaded: state.forPartners.loaded
}), {fetchForPartners})(ForPartners)
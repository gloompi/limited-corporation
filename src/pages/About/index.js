import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import style from './style'
import {fetchAbout} from '../../ducks/about'
import {createMarkup} from '../../helpers'
import Loader from '../../components/Loader'
import ModalWindow from './ModalWindow'

class About extends Component{
  state = {
    open: false,
    src: ''
  }

  componentDidMount() {
    const {fetchAbout, loaded} = this.props
    if(!loaded) fetchAbout()
  }

  render(){
    const {about, loaded} = this.props
    const {open, src} = this.state
    if(!loaded) return <Loader />
    const {documents} = about
    const {content} = about.content
    return(
      <div className={style.wrapper}>
        <section className={style.section}>
          <div className={`${style.container} ${style.section__container}`}>
            <div className={style.section__icon}>
              <i className="fas fa-newspaper"></i>
            </div>
            <h2 className={style.section__title}>О компании</h2>
            <div className={style.content__wrap}>
              <ModalWindow 
                handleClose={this.handleClose}
                open={open}
                src={src}
              />
              <div className={`${style.content} content`} dangerouslySetInnerHTML={createMarkup(content)}></div>
              <ul className={style.documents__list}>
                {documents.map(item => {
                  const {id, img} = item
                  return <li key={id} className={`${style.documents__item}`}>
                    <a href="" onClick={this.handleOpen(img)} className={style.documents__link}>
                      <img src={img} />
                    </a>
                  </li>
                })}
              </ul>
            </div>
          </div>
        </section>
      </div>
    )
  }

  handleOpen = src => e => {
    e.preventDefault()

    this.setState({open: true, src})
  }

  handleClose = e => {
    e.preventDefault()

    this.setState({open: false})
  }
}

export default connect(state => ({
  about: state.about.content,
  loaded: state.about.loaded
}), {fetchAbout})(About)
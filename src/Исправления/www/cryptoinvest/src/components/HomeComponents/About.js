import React from 'react'
import PropTypes from 'prop-types'

import style from './style.styl'

function About(props){
  return(
    <section id="point" className={style.section}>
      <div className={`${style.container} ${style.section__container}`}>
        <div className={style.section__icon}>
          <img src={require('../../assets/images/logo-pic.png')} alt="icon"/>
        </div>
        <h2 className={style.section__title}>О компании</h2>
        <span className={style.section__longtitle}>Мы - новаторская платформа. Посмотри видео как это работает.</span>
        <video className={style.about__video} src={require('../../assets/video/video.mp4')} controls></video>
      </div>
    </section>
  )
}

export default About
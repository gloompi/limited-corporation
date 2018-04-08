import React from 'react'
import PropTypes from 'prop-types'
import style from '../style.styl'

function SocialList(props){
  return(
    <ul className={style.social__list}>
      <li className={style.social__item}>
        <a href="https://www.youtube.com/channel/UCIXZRKVM6uE9zbcmBtGR6CQ" className={style.social__link}>
          <i className="fab fa-youtube"></i>
        </a>
      </li>
      <li className={style.social__item}>
        <a href="https://vk.com/cryptoinvest_group" className={style.social__link}>
          <i className="fab fa-vk"></i>
        </a>
      </li>
    </ul>
  )
}

export default SocialList
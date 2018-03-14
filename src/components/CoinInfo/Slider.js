import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactSlider from 'react-slider'

import style from './style'

class Slider extends Component{
  render(){
    const {handleSlide, max, min} = this.props
    return(
      <ReactSlider 
        className={style.slider} 
        min={min}
        max={max}
        onChange={handleSlide}
        withBars style={{width: '90%'}}>
        <span 
          className={style.input__refresh} >
            <i className={`fab fa-first-order`} />
        </span>
      </ReactSlider>
    )
  }
}

export default Slider
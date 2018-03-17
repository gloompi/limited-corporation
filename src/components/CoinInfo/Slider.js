import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactSlider from 'react-slider'

import style from './style'

class Slider extends Component{
  state = {
    value: 0
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.slug !== nextProps.slug) this.setState({value: 0})
  }

  render(){
    const {max, min} = this.props
    const {value} = this.state
    return(
      <ReactSlider 
        className={style.slider} 
        min={min}
        max={max}
        value={value}
        onChange={this.handleChange}
        withBars style={{width: '90%'}}>
        <span 
          className={style.input__refresh} >
            <i className={`fab fa-first-order`} />
        </span>
      </ReactSlider>
    )
  }

  handleChange = (value) => {
    const {handleSlide} = this.props
    
    this.setState({value})
    handleSlide(value)
  }
}

export default Slider
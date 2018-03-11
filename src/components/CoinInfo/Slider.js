import React, {Component} from 'react'
import PropTypes from 'prop-types'

import style from './style'

class Slider extends Component{
  static propTypes = {
  }

  render(){
    const {handleSlide} = this.props
    return(
      <a 
        className={style.input__refresh} 
        onDrag={this.onDrag}
        onDragEnd={(e) => console.log('drag end', e.target)}
        onDragStart={(e) => console.log('drag start', e.target)}>
          <i className={`fab fa-first-order`} />
      </a>
    )
  }

  onDrag = e => {
    console.log(e.target)
  }
}

export default Slider
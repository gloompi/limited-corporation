import React from 'react'

function Loader(props){
  const {width = 35} = props
  const style = {
    width: width
  }
  return(
    <h3>Loading...</h3>
    // <img src={require('../assets/images/loader.gif')} style={style} />
  )
}

export default Loader
import React from 'react'
import PropTypes from 'prop-types'

function Ripple({height = 25, color = '#000'}){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="78.926 179.615 256.171 349.649">
      <path d="M134.85 445.1c3.755-2.85 9.105-2.099 11.947 1.655l1.033 1.357c14.464 19.029 36.036 29.952 59.17 29.952a8.53 8.53 0 0 1 8.533 8.533A8.525 8.525 0 0 1 207 495.13c-28.518 0-55.04-13.38-72.764-36.71l-1.033-1.365c-2.85-3.763-2.108-9.114 1.647-11.955zm-27.793 33.971c24.235 31.898 60.663 50.193 99.942 50.193 39.287 0 75.708-18.295 99.934-50.185l.998-1.306c36.19-47.625 36.19-114.15.179-161.536l-94.148-133.231c-3.2-4.523-10.726-4.523-13.926 0l-93.969 133.001c-36.19 47.616-36.19 114.142.009 161.775l.981 1.289z" fill={color}/>
    </svg>
  )
}

export default Ripple
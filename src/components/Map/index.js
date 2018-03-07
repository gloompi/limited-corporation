import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {YMaps, Map, Placemark} from 'react-yandex-maps'

import style from './style'

export default class MapComponent extends Component {
  render() {
    return (
      <div className={style.map__wrap}>
        {this.getMap()}
      </div>
    )
  }
  getMap = () => {
    const mapState = {
      center: [
        32.37302558666005, 119.42665999999997
      ],
      zoom: 12,
    }
    return <YMaps style={{width: "100%", height: "100%"}}>
      <Map 
        width="100%" 
        height="100%" 
        state={mapState}
        instanceRef = {ref => { ref && ref.behaviors.disable('scrollZoom'); }}>
        <Placemark
          geometry={{
            coordinates: [32.37302558666005,119.42665999999997]
          }}
          properties={{
            hintContent: 'Собственный значок метки',
            balloonContent: 'Это красивая метка'
          }}
        />
      </Map>
    </YMaps>
  }
}
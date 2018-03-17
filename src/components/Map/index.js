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
      center: [55.86375256886657,37.65080999999997],
      zoom: 15,
    }
    return <YMaps style={{width: "100%", height: "100%"}}>
      <Map 
        width="100%" 
        height="100%" 
        state={mapState}
        instanceRef = {ref => { ref && ref.behaviors.disable('scrollZoom'); }}>
        <Placemark
          geometry={{
            coordinates: [55.86375256886657,37.65080999999997]
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
import React from 'react'
import PropTypes, { func } from 'prop-types'

import style from '../../../pages/Account/style.styl'
import Lite from '../../Icons/Lite'
import Dash from '../../Icons/Dash'
import Bit from '../../Icons/Bit'
import Ripple from '../../Icons/Ripple'
import Etherium from '../../Icons/Etherium'

function CoinNavigate({profits, activeCoin, handleChange}){
  return(
    <ul className={style.navigate__list}>
      {profits.map(profit => {
        const {slug, title, percent, duration, amount_floor, amount_ceil, pay_off} = profit
        const percentPerDay = (percent - 100) / duration
        return <li key={slug} className={style.navigate__item}>
          <a href="" className={`${style.navigate__link} ${activeCoin == slug && style.active}`} onClick={handleChange(slug)}>
            {getIcon(slug, activeCoin)}
            <div className={style.navigate__content}>
              <h3>Вклад в {title}</h3>
              <span>{percentPerDay}% ставка в день</span>
              <span>Возврат депозита через {duration} дней</span>
            </div>
          </a>
        </li>
      })}
    </ul>
  )
}

function getIcon(slug, activeCoin){
  switch (slug) {
    case 'BTC':
      return <Bit 
        height={45} 
        color={slug == activeCoin ? '#fff' : '#000'} 
        innerColor={slug == activeCoin ? '#FE510D' : '#fff'} />
    
    case 'XRP':
      return <Ripple height={45} color={slug == activeCoin ? '#fff' : '#000'} />

    case 'ETH':
      return <Etherium height={45} color={slug == activeCoin ? '#fff' : '#000'} />

    case 'LTC':
      return <Lite 
        height={45} 
        color={slug == activeCoin ? '#fff' : '#000'} 
        innerColor={slug == activeCoin ? '#FE510D' : '#fff'} />

    case 'DSH':
      return <Dash 
        height={45} 
        color={slug == activeCoin ? '#fff' : '#000'} 
        innerColor={slug == activeCoin ? '#FE510D' : '#fff'} />

    default:
      return slug
  }
}

export default CoinNavigate
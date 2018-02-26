import React, {Component} from 'react'
import PropTypes from 'prop-types'

import style from '../style.styl'
import arrow from '../../../assets/images/arrow-plan.png'
import Bit from '../../Icons/Bit'
import Dash from '../../Icons/Dash'
import Etherium from '../../Icons/Etherium'
import Ripple from '../../Icons/Ripple'
import Lite from '../../Icons/Lite'

class CoinNavigate extends Component{
  state = {
    inputvalue: ''
  }

  componentDidMount() {
    const {amount_floor} = this.props
    this.setState({
      inputvalue: amount_floor
    })
  }

  
  componentWillReceiveProps(nextProps) {
    const {amount_floor} = nextProps
    this.setState({
      inputvalue: amount_floor
    })
  }

  render(){
    const {
      activeCoin,
      slug, 
      title, 
      percent, 
      duration, 
      pay_off, 
      profits, 
      handleChange} = this.props
    const {inputvalue} = this.state
    const profit = inputvalue * percent
    const profitPerDay = (percent - 100) / duration + ''
    return(
      <div className={style.navigate__wrap}>
        <div className={style.instruction__wrap}>
          <img src={arrow} alt="arrow"/>
          <h4 className={style.instruction__title}>
            <span>Выберите</span>
            <span>тип инвестиций</span>
          </h4>
        </div>
        <div className={style.calc__wrap}>
          <ul className={style.tabs__list}>
            {profits.map(profit => {
              const {slug, title} = profit
              return <li key={slug} className={style.tab__item}>
                <a 
                  className={`${style.tab__btn} ${activeCoin == slug ? style.active : null}`}
                  onClick={handleChange(slug)}>
                  {this.getIcon(slug, activeCoin)}
                  {title}
                </a>
              </li>
            })}
          </ul>
          <div className={style.calc__main}>
            <div className={style.input__wrap}>
              <label className={style.input__label}>
                <h4 className={style.info__title}>Введите сумму</h4>
                <div className={style.input__container}>
                  <input 
                    className={style.input__itself} 
                    type="text" 
                    value={inputvalue} 
                    onChange={this.onChange} />
                  <i className={`fas fa-ruble-sign ${style.input__currency}`}></i>
                  <a 
                    className={style.input__refresh} 
                    onClick={this.handleRefresh}><i className={`fab fa-first-order`}></i></a>
                </div>
              </label>
            </div>
            <ul className={style.info__list}>
              <li className={style.info__item}>
                <div className={style.info__item_top}>
                  <h4 className={style.info__item_title}>Сумма депозита</h4>
                  <i className="far fa-money-bill-alt"></i>
                </div>
                <span className={style.info__item_value}>{`${inputvalue} RUB`}</span>
              </li>
              <li className={style.info__item}>
                <div className={style.info__item_top}>
                  <h4 className={style.info__item_title}>Получите прибыли</h4>
                  <i className="far fa-money-bill-alt"></i>
                </div>
                <span className={style.info__item_value}>{`${profit} RUB`}</span>
              </li>
              <li className={style.info__item}>
                <div className={style.info__item_top}>
                  <h4 className={style.info__item_title}>Начисление</h4>
                  <i className="fas fa-chart-pie"></i>
                </div>
                <span className={style.info__item_value}>{`${profitPerDay.slice(0, profitPerDay.indexOf('.') + 2)}% каждые 24ч.`}</span>
              </li>
              <li className={style.info__item}>
                <div className={style.info__item_top}>
                  <h4 className={style.info__item_title}>Срок депозита</h4>
                  <i className="far fa-clock"></i>
                </div>
                <span className={style.info__item_value}>{`${duration} дней`}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  handleRefresh = e => {
    e.preventDefault()
    const {amount_floor} = this.props
    this.setState({
      inputvalue: amount_floor
    })
  }

  onChange = e => {
    this.setState({
      inputvalue: e.target.value
    })
  }

  getIcon = (slug, activeCoin) => {
    switch (slug) {
      case 'BTC':
        return <Bit 
          height={16} 
          color={slug == activeCoin ? '#fff' : '#000'} 
          innerColor={slug == activeCoin ? '#FE510D' : '#fff'} />
      
      case 'XRP':
        return <Ripple height={16} color={slug == activeCoin ? '#fff' : '#000'} />

      case 'ETH':
        return <Etherium height={16} color={slug == activeCoin ? '#fff' : '#000'} />

      case 'LTC':
        return <Lite 
          height={16} 
          color={slug == activeCoin ? '#fff' : '#000'} 
          innerColor={slug == activeCoin ? '#FE510D' : '#fff'} />

      case 'DSH':
        return <Dash 
          height={16} 
          color={slug == activeCoin ? '#fff' : '#000'} 
          innerColor={slug == activeCoin ? '#FE510D' : '#fff'} />

      default:
        return slug
    }
  }
}

export default CoinNavigate
import React from 'react'
import PropTypes from 'prop-types'

import style from '../../../pages/Account/style.styl'
import Qiwi from '../../Icons/Qiwi'
import Cards from '../../Icons/Cards'
import Yandex from '../../Icons/Yandex'
import Paypal from '../../Icons/Paypal'
import Bit from '../../Icons/Bit'

function PayOffList(props){
  return(
    <div className={style.section}>
      <div className={style.section__top}>
        <h3 className={style.section__title}>Выберите платежную систему для вывода денежных средств:</h3>
      </div>
      <div className={style.section__container}>
        <ul className={style.payoff__list}>
          <li className={style.payoff__item}>
            <a href="" className={style.payoff__link}>
              <Qiwi height={100} color='#F09515'/>
              <h4 className={style.payoff__title}>QIWI WALLET</h4>
              <span className={style.payoff__info}>
                &#10004; Коммисия за обработку: 0%
              </span>
              <span className={style.payoff__btn}>Создать заявку</span>
            </a>
          </li>
          <li className={style.payoff__item}>
            <a href="" className={style.payoff__link}>
              <Cards height={100} color='#059EE6'/>
              <h4 className={style.payoff__title}>Банковская карта</h4>
              <span className={style.payoff__info}>
                &#10004; Коммисия за обработку: 0%
              </span>
              <span className={style.payoff__btn}>Создать заявку</span>
            </a>
          </li>
          <li className={style.payoff__item}>
            <a href="" className={style.payoff__link}>
              <Yandex height={100} color='#FF5C00'/>
              <h4 className={style.payoff__title}>Яндекс Деньги</h4>
              <span className={style.payoff__info}>
                &#10004; Коммисия за обработку: 0%
              </span>
              <span className={style.payoff__btn}>Создать заявку</span>
            </a>
          </li>
          <li className={style.payoff__item}>
            <a href="" className={style.payoff__link}>
              <Paypal height={100} color='#0184E2'/>
              <h4 className={style.payoff__title}>Paypal кошелек</h4>
              <span className={style.payoff__info}>
                &#10004; Коммисия за обработку: 0%
              </span>
              <span className={style.payoff__btn}>Создать заявку</span>
            </a>
          </li>
          <li className={style.payoff__item}>
            <a href="" className={style.payoff__link}>
              <Bit height={100} color='#F7931A'/>
              <h4 className={style.payoff__title}>На крипто кошелек</h4>
              <span className={style.payoff__info}>
                &#10004; Коммисия за обработку: 0%
              </span>
              <span className={style.payoff__btn}>Создать заявку</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PayOffList
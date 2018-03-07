import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import style from './style.styl'

function ProfitPath(props){
  return(
    <section className={style.section}>
      <div className={`${style.container} ${style.section__container}`}>
        <div className={style.section__icon}>
          <i className="fas fa-money-bill-alt"></i>
        </div>
        <h2 className={style.section__title}>Как получается доход</h2>
        <span className={style.section__longtitle}>Вы задаетесь вопросом как компания приносит вам прибыль?</span>
      </div>
      <div className={style.path__wrap}>
        <div className={`${style.container} ${style.path__container}`}>
          <ul className={style.path__list}>
            <li className={style.path__item}>
              <div className={style.path__top}>
                <span className={style.path__top_number}>1</span>
                <span className={style.path__top_txt}>Сбор инвестиционных средств на счетах компании </span>
              </div>
              <h4 className={style.path__title}>Первый этап</h4>
              <span className={style.path__descr}>На первом этапе происходит накопление финансовых средств.</span>
            </li>
            <li className={style.path__item}>
              <div className={style.path__top}>
                <span className={style.path__top_number}>2</span>
                <span className={style.path__top_txt}> Централизация средств на счетах наших трейдеров </span>
              </div>
              <h4 className={style.path__title}>Второй этап</h4>
              <span className={style.path__descr}>Происходит распределение средств на трейдерские счета.</span>
            </li>
            <li className={style.path__item}>
              <div className={style.path__top}>
                <span className={style.path__top_number}>3</span>
                <span className={style.path__top_txt}>Анализ текущего состояния рынка</span>
              </div>
              <h4 className={style.path__title}>Третий этап</h4>
              <span className={style.path__descr}>Начинается работа нашей трейдерской команды, а именно проведение анализа рынка и общей ситуации на биржах.</span>
            </li>
            <li className={style.path__item}>
              <div className={style.path__top}>
                <span className={style.path__top_number}>6</span>
                <span className={style.path__top_txt}>Вывод средств на счета компании </span>
              </div>
              <h4 className={style.path__title}>Шестой этап</h4>
              <span className={style.path__descr}>После торговли прибыль с торговых бирж направляется на сберегательные счета компании.</span>
            </li>
            <li className={style.path__item}>
              <div className={style.path__top}>
                <span className={style.path__top_number}>5</span>
                <span className={style.path__top_txt}>Торговля трейдеров на бирже </span>
              </div>
              <h4 className={style.path__title}>Пятый этап</h4>
              <span className={style.path__descr}>Трейдеры начинают торговать активами с максимально возможным объемом.</span>
            </li>
            <li className={style.path__item}>
              <div className={style.path__top}>
                <span className={style.path__top_number}>4</span>
                <span className={style.path__top_txt}>Выбор наиболее оптимальной стратегии торговли </span>
              </div>
              <h4 className={style.path__title}>Четвертый этап</h4>
              <span className={style.path__descr}>Подбор правильной торговой стратегии для минимизации рисков.</span>
            </li>
            <li className={style.path__item}>
              <div className={style.path__top}>
                <span className={style.path__top_number}>7</span>
                <span className={style.path__top_txt}>Распределение средств между счетами </span>
              </div>
              <h4 className={style.path__title}>Седьмой этап</h4>
              <span className={style.path__descr}>Перевод средств со сберегательных счетов компании на электронные кошельки.</span>
            </li>
            <li className={style.path__item}>
              <div className={style.path__top}>
                <span className={style.path__top_number}>8</span>
                <span className={style.path__top_txt}>Выплаты процентов </span>
              </div>
              <h4 className={style.path__title}>Восьмой этап</h4>
              <span className={style.path__descr}>Компания выплачивает проценты на счета своих инвесторов.</span>
            </li>
            <li className={style.path__item}>
              <div className={style.path__top}>
                <Link to="/sign-up">Пройти регистрацию</Link>
              </div>
              <span className={style.path__descr}>Начните зарабатывать вместе с Cryptoinvest.Systems</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ProfitPath
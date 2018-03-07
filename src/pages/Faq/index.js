import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import style from './style'
import {fetchFaq} from '../../ducks/faq'
import {createMarkup} from '../../helpers'
import Loader from '../../components/Loader'

class ForPartners extends Component{
  static propTypes = {
  }

  componentDidMount() {
    const {fetchFaq, loaded} = this.props
    if(!loaded) fetchFaq()
  }

  render(){
    const {entities, loaded} = this.props
    if(!loaded) return <Loader />
    return(
      <div className={style.wrapper}>
        <section className={style.section}>
          <div className={`${style.container} ${style.section__container}`}>
            <div className={style.section__icon}>
              <i className="fas fa-newspaper"></i>
            </div>
            <h2 className={style.section__title}>Вопрос - Ответ</h2>
            <ul className={style.faq__list}>
              {entities.map(item => {
                const {question, answer} = item
                return <li key={question} className={style.faq__item}>
                  <span className={style.faq__link}><h3 className={style.question}>{question}</h3></span>
                  <div className={style.answer}>{answer}</div>
                </li>
              })}
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

export default connect(state => ({
  entities: state.faq.entities,
  loaded: state.faq.loaded
}), {fetchFaq})(ForPartners)
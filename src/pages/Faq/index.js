import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import style from './style'
import {fetchFaq} from '../../ducks/faq'
import {createMarkup} from '../../helpers'
import Loader from '../../components/Loader'

class ForPartners extends Component{
  state = {
    active: 1
  }

  componentDidMount() {
    const {fetchFaq, loaded} = this.props
    if(!loaded) fetchFaq()
  }

  render(){
    const {entities, loaded} = this.props
    const {active} = this.state
    if(!loaded) return <Loader />
    this.setState({active: entities.length + 1})
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
                const {id, question, answer} = item
                return <li key={question} className={`${style.faq__item} ${active == id ? style.active : null}`}>
                  <a className={style.faq__link} onClick={this.handleChange(id)}><h3 className={style.question}>{question}</h3></a>
                  <div className={style.answer}>{answer}</div>
                </li>
              })}
            </ul>
          </div>
        </section>
      </div>
    )
  }

  handleChange = (id) => e => {
    e.preventDefault()
    
    this.setState({active: id})
  }
}

export default connect(state => ({
  entities: state.faq.entities,
  loaded: state.faq.loaded
}), {fetchFaq})(ForPartners)
import React, {Component} from 'react'
import style from './style'
import {Link} from 'react-router-dom'

class Success extends Component{
    render(){
        return(
            <div className={style.wrapper}>
                <section className={style.section}>
                    <div className={`${style.container} ${style.section__container}`}>
                        <div className={style.section__icon}>
                        <i className="far fa-check-circle"></i>
                        </div>
                        <h2 className={style.section__title}>Оплата прошла успешно!</h2>
                        <span className={style.go__home}>Вернуться на <Link to="/">Главную</Link></span>
                    </div>
                </section>
            </div>
        )
    }
}

export default Success
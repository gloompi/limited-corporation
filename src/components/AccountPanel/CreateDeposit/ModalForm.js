import React, {Component} from 'react'

import style from '../../../pages/Account/style.styl'

class ModalForm extends Component {
    state = {
        current: null
    }

    render(){
        const {entities, amount, modal, handleClose} = this.props
        return (
            <div className={`${style.form__modal_wrap} ${modal && style.active}`}>
                <div className={style.form__modal}>
                    <h3 className={style.form__modal_title}>Выберите платежную систему</h3>
                    <ul className={style.form__modal_list}>
                        {entities.map(item => {
                            const {
                                max_summ, min_summ, obmen_curs, recive_paysys_icon, 
                                recive_paysys_identificator, recive_paysys_title,
                                recive_paysys_valute, send_paysys_icon, send_paysys_identificator,
                                send_paysys_title, send_paysys_valute
                            } = item
                            return <li key={send_paysys_identificator} className={style.form__modal_item}>
                                <label>
                                    <input onChange={this.handleChange} type="radio" name="payed_paysys" value={send_paysys_identificator} />
                                    <img src={send_paysys_icon} />
                                </label>
                            </li>
                        })}
                    </ul>
                    <input type="hidden" name="amount" value={this.getUSD(amount)} />
                    <div className={style.form__modal_info}>
                        {this.displayInfo()}
                    </div>
                    <div className={style.form__modal_btns}>
                        <button type='submit'>Перейти к оплате</button>
                        <a href="" onClick={handleClose} >Закрыть</a>
                    </div>
                </div>
            </div>
        )
    }
    getUSD = (value) => {
        const curs = this.props.entities.filter(item => item.send_paysys_identificator == 'YAMRUB')[0].obmen_curs
        return value / curs
    }

    displayInfo = () => {
        const {current} = this.state
        if(!current) return
        const checkedAgrigator = this.props.entities.filter(item => item.send_paysys_identificator == current)[0]
        const {send_paysys_identificator, send_paysys_title, send_paysys_valute} = checkedAgrigator
        return [
            <h3 key={1}>Система: {send_paysys_title}</h3>,
            <span key={2}>Валюта: {send_paysys_valute}</span>
        ]
    }

    handleChange = e => {
        const current = e.target.value
        this.setState({current})
    }
}

export default ModalForm
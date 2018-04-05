import React, {Component} from 'react'

import style from '../../../pages/Account/style.styl'

class ChargeModal extends Component{
	render(){
		const {open, agregator, input, handleClose, handleInput, getUSD} = this.props
		return <div className={`${style.form__modal_wrap} ${open && style.active}`}>
			<div className={style.form__modal}>
        <h3 className={style.form__modal_title}>Введите информацию для создания заявки</h3>
        <input type="hidden" name="payed_paysys" value={agregator} />
        <input 
          className={style.modal__input} 
          type="text" 
          name="rub-value" 
          onChange={handleInput}
          value={input}
          placeholder="Введите сумму" />
        <input type="hidden" name="amount" value={getUSD(input)} />
				<div className={style.form__modal_btns}>
					<button type='submit' onClick={this.handleClick}>Пополнить счет</button>
					<a href="" onClick={handleClose} >Закрыть</a>
				</div>
			</div>
		</div>
  }
}

export default ChargeModal
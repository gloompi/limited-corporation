import React, {Component} from 'react'

import style from '../../../pages/Account/style.styl'

class PayOffModal extends Component{
	render(){
		const {open, agregator, handleClose} = this.props
		return <div className={`${style.form__modal_wrap} ${open && style.active}`}>
			<div className={style.form__modal}>
				<h3 className={style.form__modal_title}>Введите информацию для создания заявки</h3>
				{this.getAgregator(agregator)}
				<div className={style.form__modal_btns}>
					<button type='submit' onClick={this.handleClick}>Создать заявку</button>
					<a href="" onClick={handleClose} >Закрыть</a>
				</div>
			</div>
		</div>
	}

	getAgregator = (agregator) => {
		const {handleArea, handleInput, handleAmount, input, amount, comment} = this.props
		const card = <div>
			<input 
				className={style.modal__input} 
				type="text" 
				onChange={handleInput}
				value={input}
				placeholder="Номер карты" />
			<input 
				className={style.modal__input} 
				type="text" 
				onChange={handleAmount}
				value={amount}
				placeholder="Сумма" />
			<textarea 
				className={style.modal__textarea}
				type="text"
				onChange={handleArea}
				value={comment}
				placeholder="Комментарий (Любые дополнительные сведения для оплаты)"
			/>
		</div>

		const wallet = <div>
			<input 
				className={style.modal__input} 
				type="text" 
				onChange={handleInput}
				value={input}
				placeholder="Номер кошелька" />
			<input 
				className={style.modal__input} 
				type="text" 
				onChange={handleAmount}
				value={amount}
				placeholder="Сумма" />
			<textarea 
				className={style.modal__textarea}
				type="text"
				onChange={handleArea}
				value={comment}
				placeholder="Комментарий (Любые дополнительные сведения для оплаты)"
			/>
		</div>

		switch(agregator){
			case "BC":
				return card

			default:
				return wallet
		}
	}
}

export default PayOffModal
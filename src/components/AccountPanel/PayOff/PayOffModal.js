import React, {Component} from 'react'

import style from '../../../pages/Account/style.styl'

class PayOffModal extends Component{
	render(){
		const {open, agregator, handleClose, user} = this.props
		return <div className={`${style.form__modal_wrap} ${open && style.active}`}>
			<div className={style.form__modal}>
				<h3 className={style.form__modal_title}>Введите информацию для создания заявки</h3>
				<div className={style.payoff__create_info}>
					<h4>Инструкция по выводу средств</h4>
					<ul>
						<li>Введите сумму (минимальная сумма для вывода: Qiwi, YandexMoney, Payeer RUB - 100 руб. Visa/Mastercard, Paypal - 500 RUB)</li>
						<li><strong>Внимание!</strong> Убедитесь в правильности Ваших платежных реквизитов</li>
					</ul>
					<p>В течение 24-х часов вы получите выплату на выбранный Вами электронный кошелёк. </p>
					<p><strong>Лимиты:</strong> В течении рабочего дня заявка на вывод средств может быть создана один раз. Интервал между созданием заявок должен составлять не менее 24-х часов. </p>
				</div>
				<h4 
					className={style.deposit__balance_title} 
					style={{color: user.account_resource < 100 ? 'red' : '#000'}}>
						{user.account_resource < 100 ? 'Недостаточно средств' : 'Доступные средства'}
				</h4>
				<div className={style.deposit__resource_info}>{user.account_resource} руб.</div>
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
import React, {Component} from 'react'
import {connect} from 'react-redux'

import style from '../../../pages/Account/style'
import {fetchPartnersStatistic} from '../../../ducks/partners'
import Loader from '../../Loader'

class PartnersLinks extends Component {
	componentDidMount() {
		const {fetchPartnersStatistic, statistic} = this.props
		if(!statistic) fetchPartnersStatistic()
	}
	
	render(){
		const username = localStorage.getItem('userName')
		const {statistic} = this.props
		if(!statistic) return <Loader />
		const {referals, active_referals, amount} = statistic
		return (
			<div className={`${style.section__wrap} ${style.row}`}>
				<div className={`${style.section} ${style.account__section}`}>
					<div className={style.section__top}>
						<h3 className={style.section__title}>Партнерская программа «CryptoInvest»</h3>
					</div>
					<div className={style.section__container}>
						<p className={style.statistic__info_descr}>
							Каждый зарегистрированный участник компании «CryptoInvest» может воспользоваться своей реферальной ссылкой для приглашения партнеров и получать вознаграждения от первоначального депозита Вашего реферала. 
						</p>
						<p className={style.statistic__info_descr}>
							<b>Партнерское вознаграждение:</b> <span className={style.red}>5% от суммы депозита </span>
						</p>
						<p className={style.statistic__info_descr}>
							<b>Пример:</b> приглашенный Вами человек вложил 20 000 рублей, Вы автоматически получаете на основной баланс партнерское вознаграждение 1000 рублей. 
						</p>
						<b className={style.centered}>Соблюдайте правила партнерской программы:</b>
						<div className={`${style.info__window} ${style.active}`}>
							Запрещается регистрировать свои аккаунты под свою реферальную систему.
						</div>
						<div className={`${style.info__window} ${style.active}`}>
							Запрещается спамить свою реферальную ссылку в различных группах и в комментариях в соц.сети ВКонтакте.
						</div>
					</div>
				</div>
				<div className={`${style.section} ${style.account__section}`}>
					<div className={style.section__top}>
						<h3 className={style.section__title}>Ваша финансовая статистика:</h3>
					</div>
					<div className={style.section__container}>
						<h3 className={`${style.statistic__info_title} ${style.centered}`}>
							Ваша ссылка для привлечения рефералов:
						</h3>
						<input id="copyTarget" type="text" onChange={(e) => console.log(e)} className={`${style.partners__link}`} value={`https://cryptoinvest.systems/ref/${username}`} />
						<button className={`${style.copy__to_clipboard} copy__to_clipboard`} data-clipboard-target="#copyTarget">
							<i className="far fa-clipboard"></i>
							Скопировать ссылку
						</button>
						<ul className={style.statistic__list}>
							<li className={style.statistic__item}>
								<div className={style.statistic__info}>
								<div className={style.icon__wrap}>  
									<i className="far fa-money-bill-alt"></i>
								</div>
								<div>
									<h4 className={style.statistic__info_title}>Доход с рефералов:</h4>
									<span className={style.statistic__info_descr}>Общая сумма Ваших доходов с привлеченных партнеров</span>
								</div>
								</div>
								<span className={style.statistic__value} style={{backgroundColor: '#FF2830'}}>{amount} руб.</span>
							</li>
							<li className={style.statistic__item}>
								<div className={style.statistic__info}>
								<div className={style.icon__wrap}>  
									<i className="fas fa-sitemap"></i>
								</div>
								<div>
									<h4 className={style.statistic__info_title}>Всего рефералов:</h4>
									<span className={style.statistic__info_descr}>Общее количество привлеченных Вами партнеров</span>
								</div>
								</div>
								<span className={style.statistic__value} style={{backgroundColor: '#FF2830'}}>{referals}</span>
							</li>
							<li className={style.statistic__item}>
								<div className={style.statistic__info}>
								<div className={style.icon__wrap}>  
									<i className="fas fa-chess-king"></i>
								</div>
								<div>
									<h4 className={style.statistic__info_title}>Всего активных рефералов:</h4>
									<span className={style.statistic__info_descr}>Активный реферал - это реферал с минимум одним депозитом</span>
								</div>
								</div>
								<span className={style.statistic__value} style={{backgroundColor: '#FF2830'}}>{active_referals}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(({partners}) => ({
	statistic: partners.statistic
}), {fetchPartnersStatistic})(PartnersLinks)
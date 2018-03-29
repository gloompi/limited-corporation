import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import style from '../../../pages/Account/style.styl'
import {fetchPartnersList} from '../../../ducks/partners'
import Loader from '../../Loader'

class PartnerStatistic extends Component{
	componentDidMount() {
		const {loaded, fetchPartnersList} = this.props
		if(!loaded) fetchPartnersList()
	}

  render(){
		const {entities, loaded, error} = this.props
		if(!loaded) return <Loader />
		if(error) return <h2>Не удалось загрузить данные</h2>
    return(
			<div className={style.section__wrap}>
				<div className={`${style.section} ${style.account__section}`}>
				<div className={style.section__top}>
						<h3 className={style.section__title}>Список ваших партнеров </h3>
				</div>
				<div className={style.section__container}>
					<table className={style.table}>
						<thead>
							<tr>
								<th>Логин реферала</th>
								<th>Пополнил</th>
							</tr>
						</thead>
						<tbody>
							{Object.keys(entities).map(item => {
								const {id, email, amount} = entities[item]
								return <tr key={id}>
									<td>
										{email}
									</td>
									<td style={{color: '#fe510d'}}>
										{amount}
									</td>
								</tr>
							})}
						</tbody>
					</table>
				</div>
				</div>
			</div>
		)
  }
}

export default connect(({partners}) => ({
	loaded: partners.loaded,
	error: partners.error,
	entities: partners.entities
}), {fetchPartnersList})(PartnerStatistic)
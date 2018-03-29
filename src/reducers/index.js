import { combineReducers } from 'redux'
import currency from '../ducks/currency'
import profits from '../ducks/profits'
import auth from '../ducks/auth'
import news from '../ducks/news'
import about from '../ducks/about'
import howToStart from '../ducks/howToStart'
import forInvestors from '../ducks/forInvestors'
import forPartners from '../ducks/forPartners'
import faq from '../ducks/faq'
import deposits from '../ducks/deposits'
import payoff from '../ducks/pay_off'
import partners from '../ducks/partners'

export default (asyncReducers) => combineReducers({
  currency, auth, news, profits, about, howToStart, forInvestors,
  forPartners, faq, deposits, payoff, partners,
  ...asyncReducers
})

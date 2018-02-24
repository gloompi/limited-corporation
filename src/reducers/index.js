import { combineReducers } from 'redux'
import currency from '../ducks/currency'
import auth from '../ducks/auth'
import news from '../ducks/news'

export default (asyncReducers) => combineReducers({
  currency, auth, news,
  ...asyncReducers
})

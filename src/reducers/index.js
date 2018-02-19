import { combineReducers } from 'redux'
import tabs from '../ducks/tabs'
import currency from '../ducks/currency'

export default (asyncReducers) => combineReducers({
  tabs, currency,
  ...asyncReducers
})

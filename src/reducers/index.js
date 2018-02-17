import { combineReducers } from 'redux'
import tabs from '../ducks/tabs'

export default (asyncReducers) => combineReducers({
  tabs,
  ...asyncReducers
})

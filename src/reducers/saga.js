import {saga as currencySaga} from '../ducks/currency'
import {all} from 'redux-saga/effects'

export default function * rootSaga() {
  yield all({
    currencySaga()
  })
}
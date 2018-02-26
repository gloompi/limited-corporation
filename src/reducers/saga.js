import {saga as currencySaga} from '../ducks/currency'
import {saga as authSaga} from '../ducks/auth'
import {saga as newsSaga} from '../ducks/news'
import {saga as profitSaga} from '../ducks/profits'
import {all} from 'redux-saga/effects'

export default function * rootSaga() {
  yield all([
    currencySaga(),
    authSaga(),
    newsSaga(),
    profitSaga(),
  ])
}
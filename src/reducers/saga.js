import {saga as currencySaga} from '../ducks/currency'
import {saga as authSaga} from '../ducks/auth'
import {saga as newsSaga} from '../ducks/news'
import {saga as profitSaga} from '../ducks/profits'
import {saga as aboutSaga} from '../ducks/about'
import {saga as howToSaga} from '../ducks/howToStart'
import {saga as forInvestSaga} from '../ducks/forInvestors'
import {saga as forPartnersSaga} from '../ducks/forPartners'
import {saga as faqSaga} from '../ducks/faq'
import {all} from 'redux-saga/effects'

export default function * rootSaga() {
  try {
    yield all([
      currencySaga(),
      authSaga(),
      newsSaga(),
      profitSaga(),
      aboutSaga(),
      howToSaga(),
      forInvestSaga(),
      forPartnersSaga(),
      faqSaga(),
    ])
  } catch (error) {
    console.log('root saga---', error)
  }
}
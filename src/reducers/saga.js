import {saga as currencySaga} from '../ducks/currency'
import {saga as authSaga} from '../ducks/auth'
import {saga as newsSaga} from '../ducks/news'
import {saga as profitSaga} from '../ducks/profits'
import {saga as aboutSaga} from '../ducks/about'
import {saga as howToSaga} from '../ducks/howToStart'
import {saga as forInvestSaga} from '../ducks/forInvestors'
import {saga as forPartnersSaga} from '../ducks/forPartners'
import {saga as faqSaga} from '../ducks/faq'
import {saga as depositSaga} from '../ducks/deposits'
import {saga as payoffSaga} from '../ducks/pay_off'
import {saga as partnersSaga} from '../ducks/partners'
import {saga as counterSaga} from '../ducks/counter'
import {saga as chargeSaga} from '../ducks/charge'
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
      depositSaga(),
      payoffSaga(),
      partnersSaga(),
      counterSaga(),
      chargeSaga(),
    ])
  } catch (error) {
    console.log('root saga---', error)
  }
}
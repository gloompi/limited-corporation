import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import {appName} from '../../config'
import axios from 'axios'

const ReducerRecord = Record({
  currency: {},
  error: null,
  loaded: null
})

export const modulName = 'currency-parser'
export const FETCH_CURRENCY_REQUEST = `${appName}/${modulName}/FETCH_CURRENCY_REQUEST`
export const FETCH_CURRENCY_SUCCESS = `${appName}/${modulName}/FETCH_CURRENCY_SUCCESS`
export const FETCH_CURRENCY_ERROR = `${appName}/${modulName}/FETCH_CURRENCY_ERROR`

export default (state = new ReducerRecord, action) => {
  const {type, payload, error} = action
  switch (type) {
    case FETCH_CURRENCY_REQUEST:
      return state.set('loaded', false)

    case FETCH_CURRENCY_SUCCESS:
      return state
        .set('loaded', true)
        .set('error', false)
        .set('currency', payload.response)

    case FETCH_CURRENCY_ERROR:
      return state
        .set('loaded', true)
        .set('error', payload.error)

    default:
      return state
  }
}

export const fetchCurrency = (currency) => {
  return {
    type: FETCH_CURRENCY_REQUEST,
    currency
  }
}

const fetchCurrencySaga = function * ({currency}) {
  try {
    const response = yield call(axios.get, `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${currency}`)
    yield put({
      type: FETCH_CURRENCY_SUCCESS,
      payload: {response: response.data}
    })
  } catch (error) {
    yield put({
      type: FETCH_CURRENCY_ERROR,
      error
    })
  }
}

export const saga = function * () {
  yield takeEvery(FETCH_CURRENCY_REQUEST, fetchCurrencySaga)
}
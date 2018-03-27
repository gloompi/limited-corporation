import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'

import {appName, jwtSecretName, merchant} from '../../configClient'

const ReducerRecord = Record({
  entities: [],
  error: null,
  loaded: null
})

export const modulName = 'deposits'
export const FETCH_DEPOSITS_REQUEST = `${appName}/${modulName}/FETCH_DEPOSITS_REQUEST`
export const FETCH_DEPOSITS_SUCCESS = `${appName}/${modulName}/FETCH_DEPOSITS_SUCCESS`
export const FETCH_DEPOSITS_ERROR = `${appName}/${modulName}/FETCH_DEPOSITS_ERROR`
export const FETCH_MERCHANT_REQUEST = `${appName}/${modulName}/FETCH_MERCHANT_REQUEST`
export const FETCH_MERCHANT_SUCCESS = `${appName}/${modulName}/FETCH_MERCHANT_SUCCESS`
export const FETCH_MERCHANT_ERROR = `${appName}/${modulName}/FETCH_MERCHANT_ERROR`

export default (state = new ReducerRecord, action) => {
  const {type, payload, error} = action
  switch (type) {
    case FETCH_MERCHANT_REQUEST:
      return state
        .set('loaded', null)
        .set('error', null)

    case FETCH_MERCHANT_SUCCESS:
      return state
        .set('loaded', true)
        .set('error', false)
        .set('entities', payload)

    case FETCH_MERCHANT_ERROR:
      return state
        .set('loaded', true)
        .set('error', true)

    default:
      return state
  }
}

export const fetchMerchant = (data) => ({
  type: FETCH_MERCHANT_REQUEST,
  data
})

export const fetchMerchantSaga = function * ({data}) {
  try {
    const response = yield call(axios, {
      url: `${merchant}/obmen/get_merchant_cources/cryptoinvest`,
      method: 'get',
      crossDomain: true,
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
    console.log('response ---', response)
    yield put({
      type: FETCH_MERCHANT_SUCCESS,
      payload: {response: response.data}
    })
  } catch (error) {
    console.log('fetch merchant ---', error)
    yield put({
      type: FETCH_MERCHANT_ERROR,
      error
    })
  }
}

export const saga = function * () {
  yield takeEvery(FETCH_MERCHANT_REQUEST, fetchMerchantSaga)
}
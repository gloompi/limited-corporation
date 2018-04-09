import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'

import {getCookie} from '../helpers'
import {api, appName, jwtSecretName, merchant} from '../../configClient'

const ReducerRecord = Record({
  statistic: null,
  deposits: [],
  depositsLoaded: null,
  depositsError: null,
  entities: [],
  error: null,
  loaded: null
})

export const modulName = 'deposits'
export const CREATE_DEPOSIT_REQUEST = `${appName}/${modulName}/CREATE_DEPOSIT_REQUEST`
export const CREATE_DEPOSIT_SUCCESS = `${appName}/${modulName}/CREATE_DEPOSIT_SUCCESS`
export const CREATE_DEPOSIT_FAIL = `${appName}/${modulName}/CREATE_DEPOSIT_FAIL`
export const FETCH_DEPOSITS_REQUEST = `${appName}/${modulName}/FETCH_DEPOSITS_REQUEST`
export const FETCH_DEPOSITS_SUCCESS = `${appName}/${modulName}/FETCH_DEPOSITS_SUCCESS`
export const FETCH_DEPOSITS_ERROR = `${appName}/${modulName}/FETCH_DEPOSITS_ERROR`
export const FETCH_DEPOSITS_AMOUNT_REQUEST = `${appName}/${modulName}/FETCH_DEPOSITS_AMOUNT_REQUEST`
export const FETCH_DEPOSITS_AMOUNT_SUCCESS = `${appName}/${modulName}/FETCH_DEPOSITS_AMOUNT_SUCCESS`
export const FETCH_DEPOSITS_AMOUNT_ERROR = `${appName}/${modulName}/FETCH_DEPOSITS_AMOUNT_ERROR`
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

    case FETCH_DEPOSITS_REQUEST:
      return state
        .set('depositsLoaded', null)
        .set('depositsError', null)

    case FETCH_DEPOSITS_AMOUNT_REQUEST:
      return state.set('statistic', null)

    case FETCH_MERCHANT_SUCCESS:
      return state
        .set('loaded', true)
        .set('error', false)
        .set('entities', payload.response)

    case FETCH_DEPOSITS_SUCCESS:
      return state
        .set('depositsLoaded', true)
        .set('depositsError', false)
        .set('deposits', payload.response.results)

    case FETCH_DEPOSITS_AMOUNT_SUCCESS:
      return state.set('statistic', payload.response)

    case FETCH_MERCHANT_ERROR:
      return state
        .set('loaded', true)
        .set('error', true)

    case FETCH_DEPOSITS_ERROR:
      return state
        .set('depositsLoaded', true)
        .set('depositsError', true)

    case FETCH_DEPOSITS_AMOUNT_ERROR:
      return state.set('statistic', false)

    default:
      return state
  }
}

export const createDeposit = (profit, amount) => ({
  type: CREATE_DEPOSIT_REQUEST,
  profit, amount
})

export const fetchDepositsAmount = () => ({
  type: FETCH_DEPOSITS_AMOUNT_REQUEST
})

export const fetchDeposits = () => ({
  type: FETCH_DEPOSITS_REQUEST
})

export const fetchMerchant = (data) => ({
  type: FETCH_MERCHANT_REQUEST,
  data
})

export const createDepositSaga = function * ({profit, amount}) {
  const username = localStorage.getItem('userName')
  const data = {profit, amount, username}
  try {
    const token = localStorage.getItem(jwtSecretName)
    const csrf = getCookie('csrftoken')
    const response = yield call(axios, {
      url: `${api}/create-deposit/`,
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
        'X-CSRFToken': `${csrf}`
      },
      data
    })
    yield put({
      type: CREATE_DEPOSIT_SUCCESS,
      payload: {response}
    })
    alert('Депозит успешно создан')
  } catch (error) {
    console.log(error)
    alert('Недостаточно средств на балансе')
    yield put({
      type: CREATE_DEPOSIT_FAIL,
      error
    })
  }
}

export const fetchDepositsAmountSaga = function * () {
  try {
    const token = localStorage.getItem(jwtSecretName)
    const username = localStorage.getItem('userName')
    const {data} = yield call(axios, {
      url: `${api}/get-all-deposits-info/?username=${username}`,
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    })
    yield put({
      type: FETCH_DEPOSITS_AMOUNT_SUCCESS,
      payload: {response: data}
    })
  } catch (error) {
    console.log('deposits fetch error---', error)
    yield put({
      type: FETCH_DEPOSITS_AMOUNT_ERROR,
      error
    })
  }
}

export const fetchDepositsSaga = function * () {
  try {
    const token = localStorage.getItem(jwtSecretName)
    const username = localStorage.getItem('userName')
    const {data} = yield call(axios, {
      url: `${api}/deposits/?username=${username}`,
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    })
    yield put({
      type: FETCH_DEPOSITS_SUCCESS,
      payload: {response: data}
    })
  } catch (error) {
    console.log('deposits fetch error---', error)
    yield put({
      type: FETCH_DEPOSITS_ERROR,
      error
    })
  }
}

export const fetchMerchantSaga = function * ({data}) {
  try {
    const {data} = yield call(axios, `${merchant}/obmen/get_merchant_cources/cryptoinvest`)
    yield put({
      type: FETCH_MERCHANT_SUCCESS,
      payload: {response: data}
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
  yield takeEvery(CREATE_DEPOSIT_REQUEST, createDepositSaga)
  yield takeEvery(FETCH_DEPOSITS_AMOUNT_REQUEST, fetchDepositsAmountSaga)
  yield takeEvery(FETCH_DEPOSITS_REQUEST, fetchDepositsSaga)
  yield takeEvery(FETCH_MERCHANT_REQUEST, fetchMerchantSaga)
}
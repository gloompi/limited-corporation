import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'

import {fetchUser} from './auth'
import {getCookie} from '../helpers'
import {api, appName, jwtSecretName, merchant} from '../../configClient'

const ReducerRecord = Record({
  createPayoff: null,
  entities: [],
  error: null,
  loaded: null
})

export const modulName = 'payoff'
export const FETCH_PAYOFF_REQUEST = `${appName}/${modulName}/FETCH_PAYOFF_REQUEST`
export const FETCH_PAYOFF_SUCCESS = `${appName}/${modulName}/FETCH_PAYOFF_SUCCESS`
export const FETCH_PAYOFF_ERROR = `${appName}/${modulName}/FETCH_PAYOFF_ERROR`
export const CREATE_PAYOFF_REQUEST = `${appName}/${modulName}/CREATE_PAYOFF_REQUEST`
export const CREATE_PAYOFF_SUCCESS = `${appName}/${modulName}/CREATE_PAYOFF_SUCCESS`
export const CREATE_PAYOFF_ERROR = `${appName}/${modulName}/CREATE_PAYOFF_ERROR`

export default (state = new ReducerRecord, action) => {
  const {type, payload, error} = action
  switch (type) {
    case FETCH_PAYOFF_REQUEST:
      return state
        .set('loaded', null)
        .set('error', null)

    case CREATE_PAYOFF_REQUEST:
      return state.set('createPayoff', null)

    case FETCH_PAYOFF_SUCCESS:
      return state
        .set('loaded', true)
        .set('error', false)
        .set('entities', payload.response)

    case CREATE_PAYOFF_SUCCESS:
      return state.set('createPayoff', true)

    case FETCH_PAYOFF_ERROR:
      return state
        .set('loaded', true)
        .set('error', true)

    case CREATE_PAYOFF_ERROR:
      return state.set('createPayoff', false)

    default:
      return state
  }
}

export const createPayOff = (user_id, amount, wallet, agregator, comment) => ({
  type: CREATE_PAYOFF_REQUEST,
  user_id, amount, wallet, agregator, comment
})

export const fetchPayoffList = () => ({
  type: FETCH_PAYOFF_REQUEST
})

const createPayOffSaga = function * ({user_id, amount, wallet, agregator, comment}) {
  amount = parseInt(amount)
  const data = {user_id, amount, wallet, agregator, comment}
  const token = localStorage.getItem(jwtSecretName)
  const csrf = getCookie('csrftoken')
  try {
    const response = yield call(axios, {
      url: `${api}/create-pay-off-request/`,
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
        'X-CSRFToken': `${csrf}`
      },
      data
    })
    console.log('response---', response)
    yield put({
      type: CREATE_PAYOFF_SUCCESS
    })
    alert("Заявка успешно создана!")
  } catch (error) {
    alert(error.response.request.responseText)
    yield put({
      type: CREATE_PAYOFF_ERROR
    })
  }
}

export const fetchPayoffListSaga = function * () {
  try {
    const token = localStorage.getItem(jwtSecretName)
    const username = localStorage.getItem('userName')
    const {data} = yield call(axios, {
      url: `${api}/pay-off-list/?username=${username}`,
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    })
    yield put({
      type: FETCH_PAYOFF_SUCCESS,
      payload: {response: data}
    })
  } catch (error) {
    console.log('payoff fetch error---', error)
    yield put({
      type: FETCH_PAYOFF_ERROR,
      error
    })
  }
}

export const saga = function * () {
  yield takeEvery(CREATE_PAYOFF_REQUEST, createPayOffSaga)
  yield takeEvery(FETCH_PAYOFF_REQUEST, fetchPayoffListSaga)
}
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import {appName} from '../../configClient'
import {arrToImmObj} from '../helpers'

import {jwtSecretName} from '../../configClient'

const ProfitRecord = Record({
  slug: null,
  title: null,
  percent: null,
  duration: null,
  amount_ceil: null,
  amount_floor: null,
  pay_off: null
})

const ReducerRecord = Record({
  entities: null,
  loaded: null,
  error: null
})

export const modulName = 'profits'
export const FETCH_PROFIT_REQUEST = `${appName}/${modulName}/FETCH_PROFIT_REQUEST`
export const FETCH_PROFIT_SUCCESS = `${appName}/${modulName}/FETCH_PROFIT_SUCCESS`
export const FETCH_PROFIT_ERROR = `${appName}/${modulName}/FETCH_PROFIT_ERROR`

export default (state = new ReducerRecord, action) => {
  const {type, payload, error} = action
  switch (type) {
    case FETCH_PROFIT_REQUEST:
      return state.set('loaded', false)

    case FETCH_PROFIT_SUCCESS:
      return state
        .set('loaded', true)
        .set('error', false)
        .set('entities', arrToImmObj(payload.response, ProfitRecord, 'slug'))

    case FETCH_PROFIT_ERROR:
      return state
        .set('loaded', true)
        .set('error', error)
        .set('entities', null)

    default:
      return state
  }
}

export const fetchProfit = () => {
  return {
    type: FETCH_PROFIT_REQUEST
  }
}

const fetchProfitSaga = function * () {
  try {
    const response = yield call(axios, {
      url: 'http://88.85.81.121/api/v0/profits/',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    yield put({
      type: FETCH_PROFIT_SUCCESS,
      payload: {response: response.data.results}
    })
  } catch (error) {
    yield put({
      type: FETCH_PROFIT_ERROR,
      error
    })
  }
}

export const saga = function * () {
  yield takeEvery(FETCH_PROFIT_REQUEST, fetchProfitSaga)
}
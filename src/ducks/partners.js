import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'

import {getCookie} from '../helpers'
import {api, appName, jwtSecretName, merchant} from '../../configClient'

const ReducerRecord = Record({
  statistic: null,
  entities: [],
  error: null,
  loaded: null
})

export const modulName = 'partners'
export const FETCH_PARTNERS_REQUEST = `${appName}/${modulName}/FETCH_PARTNERS_REQUEST`
export const FETCH_PARTNERS_SUCCESS = `${appName}/${modulName}/FETCH_PARTNERS_SUCCESS`
export const FETCH_PARTNERS_ERROR = `${appName}/${modulName}/FETCH_PARTNERS_ERROR`
export const FETCH_PARTNERS_STATISTIC_REQUEST = `${appName}/${modulName}/FETCH_PARTNERS_STATISTIC_REQUEST`
export const FETCH_PARTNERS_STATISTIC_SUCCESS = `${appName}/${modulName}/FETCH_PARTNERS_STATISTIC_SUCCESS`
export const FETCH_PARTNERS_STATISTIC_ERROR = `${appName}/${modulName}/FETCH_PARTNERS_STATISTIC_ERROR`

export default (state = new ReducerRecord, action) => {
  const {type, payload, error} = action
  switch (type) {
    case FETCH_PARTNERS_REQUEST:
      return state
        .set('loaded', null)
        .set('error', null)

    case FETCH_PARTNERS_STATISTIC_REQUEST:
      return state.set('statistic', null)

    case FETCH_PARTNERS_SUCCESS:
      return state
        .set('loaded', true)
        .set('error', false)
        .set('entities', payload.response)

    case FETCH_PARTNERS_STATISTIC_SUCCESS:
      return state.set('statistic', payload.response)

    case FETCH_PARTNERS_ERROR:
      return state
        .set('loaded', true)
        .set('error', true)

    case FETCH_PARTNERS_STATISTIC_ERROR:
      return state.set('statistic', false)

    default:
      return state
  }
}

export const fetchPartnersList = () => ({
  type: FETCH_PARTNERS_REQUEST
})

export const fetchPartnersStatistic = () => ({
  type: FETCH_PARTNERS_STATISTIC_REQUEST
})

export const fetchPartnersListSaga = function * () {
  try {
    const token = localStorage.getItem(jwtSecretName)
    const username = localStorage.getItem('userName')
    const {data} = yield call(axios, {
      url: `${api}/get-referals/?username=${username}`,
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    })
    yield put({
      type: FETCH_PARTNERS_SUCCESS,
      payload: {response: data}
    })
  } catch (error) {
    console.log('partners fetch error---', error)
    yield put({
      type: FETCH_PARTNERS_ERROR,
      error
    })
  }
}

export const fetchPartnersStatisticSaga = function * () {
  try {
    const token = localStorage.getItem(jwtSecretName)
    const username = localStorage.getItem('userName')
    const {data} = yield call(axios, {
      url: `${api}/get-referals-info/?username=${username}`,
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    })
    yield put({
      type: FETCH_PARTNERS_STATISTIC_SUCCESS,
      payload: {response: data}
    })
  } catch (error) {
    console.log('partners statistic fetch error---', error)
    yield put({
      type: FETCH_PARTNERS_STATISTIC_ERROR,
      error
    })
  }
}

export const saga = function * () {
  yield takeEvery(FETCH_PARTNERS_STATISTIC_REQUEST, fetchPartnersStatisticSaga)
  yield takeEvery(FETCH_PARTNERS_REQUEST, fetchPartnersListSaga)
}
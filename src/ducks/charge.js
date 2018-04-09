import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'

import {api, appName, jwtSecretName} from '../../configClient'

const ReducerRecord = Record({
  entities: [],
  error: null,
  loaded: null
})

export const modulName = 'charge-list'
export const FETCH_CHARGELIST_REQUEST = `${appName}/${modulName}/FETCH_CHARGELIST_REQUEST`
export const FETCH_CHARGELIST_SUCCESS = `${appName}/${modulName}/FETCH_CHARGELIST_SUCCESS`
export const FETCH_CHARGELIST_ERROR = `${appName}/${modulName}/FETCH_CHARGELIST_ERROR`

export default (state = new ReducerRecord, action) => {
  const {type, payload, error} = action
  switch (type) {
    case FETCH_CHARGELIST_REQUEST:
      return state
        .set('loaded', null)
        .set('error', null)

    case FETCH_CHARGELIST_SUCCESS:
      return state
        .set('loaded', true)
        .set('error', false)
        .set('entities', payload.response)

    case FETCH_CHARGELIST_ERROR:
      return state
        .set('loaded', true)
        .set('error', true)

    default:
      return state
  }
}

export const fetchChargeList = () => ({
  type: FETCH_CHARGELIST_REQUEST
})

export const fetchChargeListSaga = function * () {
  try {
    const token = localStorage.getItem(jwtSecretName)
    const username = localStorage.getItem('userName')
    const {data} = yield call(axios, {
      url: `${api}/charge-list/`,
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    })
    yield put({
      type: FETCH_CHARGELIST_SUCCESS,
      payload: {response: data.results}
    })
  } catch (error) {
    console.log('deposits fetch error---', error)
    yield put({
      type: FETCH_CHARGELIST_ERROR,
      error
    })
  }
}

export const saga = function * () {
  yield takeEvery(FETCH_CHARGELIST_REQUEST, fetchChargeListSaga)
}
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import {appName, jwtSecretName} from '../../configClient'
import axios from 'axios'

const ReducerRecord = Record({
  entities: null,
  loaded: null
})

export const modulName = 'for-investors'
export const FETCH_FORINVEST_REQUEST = `${appName}/${modulName}/FETCH_FORINVEST_REQUEST`
export const FETCH_FORINVEST_SUCCESS = `${appName}/${modulName}/FETCH_FORINVEST_SUCCESS`
export const FETCH_FORINVEST_ERROR = `${appName}/${modulName}/FETCH_FORINVEST_ERROR`

export default (state = new ReducerRecord, action) => {
  const {type, payload, error} = action
  switch (type) {
    case FETCH_FORINVEST_REQUEST:
      return state.set('loaded', null)
    
    case FETCH_FORINVEST_SUCCESS:
      return state
        .set('entities', payload.response)
        .set('loaded', true)

    case FETCH_FORINVEST_ERROR:
      return state
        .set('loaded', false)

    default:
      return state
  }
}

export const fetchForInvest = () => {
  return {
    type: FETCH_FORINVEST_REQUEST
  }
}

const fetchForInvestSaga = function * () {
  try {
    const {data} = yield call(axios, {
      url: 'http://88.85.81.121/api/v0/for_investors/',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    yield put({
      type: FETCH_FORINVEST_SUCCESS,
      payload: {response: data.results}
    })
  } catch (error) {
    yield put({
      type: FETCH_FORINVEST_ERROR,
      error
    })
  }
}

export const saga = function * () {
  yield takeEvery(FETCH_FORINVEST_REQUEST, fetchForInvestSaga)
}
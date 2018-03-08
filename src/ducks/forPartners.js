import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import {appName, jwtSecretName} from '../../configClient'
import axios from 'axios'

const ReducerRecord = Record({
  item: null,
  loaded: null
})

export const modulName = 'for-partners'
export const FETCH_FORPARTNERS_REQUEST = `${appName}/${modulName}/FETCH_FORPARTNERS_REQUEST`
export const FETCH_FORPARTNERS_SUCCESS = `${appName}/${modulName}/FETCH_FORPARTNERS_SUCCESS`
export const FETCH_FORPARTNERS_ERROR = `${appName}/${modulName}/FETCH_FORPARTNERS_ERROR`

export default (state = new ReducerRecord, action) => {
  const {type, payload, error} = action
  switch (type) {
    case FETCH_FORPARTNERS_REQUEST:
      return state.set('loaded', null)
    
    case FETCH_FORPARTNERS_SUCCESS:
      return state
        .set('item', payload.response)
        .set('loaded', true)

    case FETCH_FORPARTNERS_ERROR:
      return state
        .set('loaded', false)

    default:
      return state
  }
}

export const fetchForPartners = () => {
  return {
    type: FETCH_FORPARTNERS_REQUEST
  }
}

const fetchForPartnersSaga = function * () {
  try {
    const {data} = yield call(axios, {
      url: 'http://88.85.81.121/api/v0/for_partners/',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    yield put({
      type: FETCH_FORPARTNERS_SUCCESS,
      payload: {response: data.results[0]}
    })
  } catch (error) {
    yield put({
      type: FETCH_FORPARTNERS_ERROR,
      error
    })
  }
}

export const saga = function * () {
  yield takeEvery(FETCH_FORPARTNERS_REQUEST, fetchForPartnersSaga)
}
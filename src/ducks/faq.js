import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import {appName, jwtSecretName} from '../../configClient'
import axios from 'axios'

const ReducerRecord = Record({
  entities: null,
  loaded: null
})

export const modulName = 'faq'
export const FETCH_FAQ_REQUEST = `${appName}/${modulName}/FETCH_FAQ_REQUEST`
export const FETCH_FAQ_SUCCESS = `${appName}/${modulName}/FETCH_FAQ_SUCCESS`
export const FETCH_FAQ_ERROR = `${appName}/${modulName}/FETCH_FAQ_ERROR`

export default (state = new ReducerRecord, action) => {
  const {type, payload, error} = action
  switch (type) {
    case FETCH_FAQ_REQUEST:
      return state.set('loaded', null)
    
    case FETCH_FAQ_SUCCESS:
      return state
        .set('entities', payload.response)
        .set('loaded', true)

    case FETCH_FAQ_ERROR:
      return state
        .set('loaded', false)

    default:
      return state
  }
}

export const fetchFaq = () => {
  return {
    type: FETCH_FAQ_REQUEST
  }
}

const fetchFaqSaga = function * () {
  try {
    const {data} = yield call(axios, {
      url: 'http://88.85.81.121/api/v0/faq/',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    yield put({
      type: FETCH_FAQ_SUCCESS,
      payload: {response: data.results}
    })
  } catch (error) {
    yield put({
      type: FETCH_FAQ_ERROR,
      error
    })
  }
}

export const saga = function * () {
  yield takeEvery(FETCH_FAQ_REQUEST, fetchFaqSaga)
}
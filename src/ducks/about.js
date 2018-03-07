import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import {appName, jwtSecretName} from '../../configClient'
import axios from 'axios'

const ReducerRecord = Record({
  content: null,
  loaded: null
})

export const modulName = 'content'
export const FETCH_ABOUT_REQUEST = `${appName}/${modulName}/FETCH_ABOUT_REQUEST`
export const FETCH_ABOUT_SUCCESS = `${appName}/${modulName}/FETCH_ABOUT_SUCCESS`
export const FETCH_ABOUT_ERROR = `${appName}/${modulName}/FETCH_ABOUT_ERROR`

export default (state = new ReducerRecord, action) => {
  const {type, payload, error} = action
  switch (type) {
    case FETCH_ABOUT_REQUEST:
      return state.set('loaded', null)
    
    case FETCH_ABOUT_SUCCESS:
      return state
        .set('content', payload.response)
        .set('loaded', true)

    case FETCH_ABOUT_ERROR:
      return state
        .set('loaded', false)

    default:
      return state
  }
}

export const fetchAbout = () => {
  return {
    type: FETCH_ABOUT_REQUEST
  }
}

const fetchAboutSaga = function * () {
  try {
    const response = yield call(axios, {
      url: 'http://localhost:8000/api/v0/about/content',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    yield put({
      type: FETCH_ABOUT_SUCCESS,
      payload: {response: response.data}
    })
  } catch (error) {
    yield put({
      type: FETCH_ABOUT_ERROR,
      error
    })
  }
}

export const saga = function * () {
  yield takeEvery(FETCH_ABOUT_REQUEST, fetchAboutSaga)
}
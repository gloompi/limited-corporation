import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import {appName, jwtSecretName} from '../../configClient'
import axios from 'axios'

const ReducerRecord = Record({
  entities: null,
  loaded: null
})

export const modulName = 'news'
export const FETCH_NEWS_REQUEST = `${appName}/${modulName}/FETCH_NEWS_REQUEST`
export const FETCH_NEWS_SUCCESS = `${appName}/${modulName}/FETCH_NEWS_SUCCESS`
export const FETCH_NEWS_ERROR = `${appName}/${modulName}/FETCH_NEWS_ERROR`

export default (state = new ReducerRecord, action) => {
  const {type, payload, error} = action
  switch (type) {
    case FETCH_NEWS_REQUEST:
      return state.set('loaded', false)

    case FETCH_NEWS_SUCCESS:
      return state
        .set('loaded', true)
        .set('news', payload.response)

    case FETCH_NEWS_ERROR:
      return state
        .set('loaded', true)

    default:
      return state
  }
}

export const fetchNews = (page = 1) => {
  return {
    type: FETCH_NEWS_REQUEST,
    page
  }
}

const fetchNewsSaga = function * ({page}) {
  try {
    const response = yield call(axios, {
      url: 'http://localhost:8000/api/v0/news/',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    console.log('response---', response)
    yield put({
      type: FETCH_NEWS_SUCCESS,
      payload: {response: response.data}
    })
  } catch (error) {
    yield put({
      type: FETCH_NEWS_ERROR,
      error
    })
  }
}

export const saga = function * () {
  yield takeEvery(FETCH_NEWS_REQUEST, fetchNewsSaga)
}
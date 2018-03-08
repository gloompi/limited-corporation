import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import {appName, jwtSecretName} from '../../configClient'
import axios from 'axios'

const ReducerRecord = Record({
  entities: null,
  loaded: null
})

export const modulName = 'how-to-start'
export const FETCH_GUIDE_REQUEST = `${appName}/${modulName}/FETCH_GUIDE_REQUEST`
export const FETCH_GUIDE_SUCCESS = `${appName}/${modulName}/FETCH_GUIDE_SUCCESS`
export const FETCH_GUIDE_ERROR = `${appName}/${modulName}/FETCH_GUIDE_ERROR`

export default (state = new ReducerRecord, action) => {
  const {type, payload, error} = action
  switch (type) {
    case FETCH_GUIDE_REQUEST:
      return state.set('loaded', null)
    
    case FETCH_GUIDE_SUCCESS:
      return state
        .set('entities', payload.response)
        .set('loaded', true)

    case FETCH_GUIDE_ERROR:
      return state
        .set('loaded', false)

    default:
      return state
  }
}

export const fetchGuide = () => {
  return {
    type: FETCH_GUIDE_REQUEST
  }
}

const fetchGuideSaga = function * () {
  try {
    const {data} = yield call(axios, {
      url: 'http://88.85.81.121/api/v0/how_to/',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    yield put({
      type: FETCH_GUIDE_SUCCESS,
      payload: {response: data.results}
    })
  } catch (error) {
    yield put({
      type: FETCH_GUIDE_ERROR,
      error
    })
  }
}

export const saga = function * () {
  yield takeEvery(FETCH_GUIDE_REQUEST, fetchGuideSaga)
}
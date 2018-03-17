import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'

import {appName, jwtSecretName, api} from '../../configClient'

const ReducerRecord = Record({
  token: null,
  user: null,
  userName: null,
  userLoading: null,
  error: null,
  loaded: null
})

export const modulName = 'authentication'
export const FETCH_AUTH_REQUEST = `${appName}/${modulName}/FETCH_AUTH_REQUEST`
export const FETCH_AUTH_SUCCESS = `${appName}/${modulName}/FETCH_AUTH_SUCCESS`
export const FETCH_AUTH_ERROR = `${appName}/${modulName}/FETCH_AUTH_ERROR`
export const FETCH_USER_SUCCESS = `${appName}/${modulName}/FETCH_USER_SUCCESS`
export const FETCH_USER_REQUEST = `${appName}/${modulName}/FETCH_USER_REQUEST`
export const FETCH_USER_ERROR = `${appName}/${modulName}/FETCH_USER_ERROR`
export const LOGOUT_REQUEST = `${appName}/${modulName}/LOGOUT_REQUEST`
export const LOGOUT_SUCCESS = `${appName}/${modulName}/LOGOUT_SUCCESS`

export default (state = new ReducerRecord, action) => {
  const {type, payload, error} = action
  switch (type) {
    case FETCH_AUTH_REQUEST:
      return state.set('loaded', false)

    case FETCH_USER_REQUEST:
      return state.set('userLoading', true)

    case LOGOUT_REQUEST:
      return state
        .set('loaded', false)
        .set('userLoading', false)
        .set('error', false)

    case FETCH_AUTH_SUCCESS:
      return state
        .set('loaded', true)
        .set('error', false)
        .set('token', payload.response)
        .set('userName', payload.username)

    case FETCH_USER_SUCCESS:
      return state
        .set('userLoading', false)
        .set('user', payload.response)
        
    case LOGOUT_SUCCESS:
      return state
        .set('token', false)
        .set('user', null)

    case FETCH_AUTH_ERROR:
      return state
        .set('loaded', true)
        .set('error', error)
        .set('token', false)

    case FETCH_USER_ERROR:
      return state
        .set('userLoading', false)
        .set('user', false)

    default:
      return state
  }
}

export const fetchAuth = (username, password) => {
  return {
    type: FETCH_AUTH_REQUEST,
    username, password
  }
}

export const fetchUser = (user, token) => {
  return {
    type: FETCH_USER_REQUEST,
    user, token
  }
}

export const logout = () => {
  return {
    type: LOGOUT_REQUEST
  }
}

const fetchAuthSaga = function * ({username, password}) {
  const authentication = {username, password}
  try {
    const response = yield call(axios, {
      url: `${api}/auth/`,
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: authentication,
    })
    console.log('fetch auth response---', response)
    yield put({
      type: FETCH_AUTH_SUCCESS,
      payload: {response: response.data.token, username}
    })
    localStorage.setItem(jwtSecretName, response.data.token)
  } catch (error) {
    yield put({
      type: FETCH_AUTH_ERROR,
      error
    })
  }
}

const fetchUserSaga = function * ({user}) {
  try {
    const token = localStorage.getItem(jwtSecretName)
    const response = yield call(axios, {
      url: `${api}/user/${user}/`,
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    })

    console.log('fetch user response---', response)
    yield put({
      type: FETCH_USER_SUCCESS,
      payload: {response: response.data}
    })
  } catch (error) {
    yield put({
      type: FETCH_USER_ERROR,
      error
    })
  }
}

const logoutSaga = function * (props) {
  try {
    const token = yield localStorage.removeItem(jwtSecretName)
    console.log('removed token---', token)

    yield put({
      type: LOGOUT_SUCCESS
    })

  } catch (error) {
    console.log('logout fail')
  }
}

export const saga = function * () {
  yield takeEvery(FETCH_AUTH_REQUEST, fetchAuthSaga)
  yield takeEvery(FETCH_USER_REQUEST, fetchUserSaga)
  yield takeEvery(LOGOUT_REQUEST, logoutSaga)
}
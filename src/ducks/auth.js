import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'

import {getCookie} from '../helpers'
import {appName, jwtSecretName, api} from '../../configClient'

const ReducerRecord = Record({
  user: {},
  userLoaded: null,
  error: null,
  loaded: null
})

export const modulName = 'authentication'
export const FETCH_AUTH_REQUEST = `${appName}/${modulName}/FETCH_AUTH_REQUEST`
export const FETCH_AUTH_SUCCESS = `${appName}/${modulName}/FETCH_AUTH_SUCCESS`
export const FETCH_AUTH_ERROR = `${appName}/${modulName}/FETCH_AUTH_ERROR`
export const FETCH_REGISTER_REQUEST = `${appName}/${modulName}/FETCH_REGISTER_REQUEST`
export const FETCH_REGISTER_SUCCESS = `${appName}/${modulName}/FETCH_REGISTER_SUCCESS`
export const FETCH_REGISTER_ERROR = `${appName}/${modulName}/FETCH_REGISTER_ERROR`
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
      return state
        .set('userLoaded', false)
        .set('user', {})

    case LOGOUT_REQUEST:
      return state
        .set('loaded', false)
        .set('userLoaded', false)
        .set('user', {})
        .set('error', false)

    case FETCH_AUTH_SUCCESS:
      return state
        .set('loaded', true)
        .set('error', false)

    case FETCH_USER_SUCCESS:
      return state
        .set('userLoaded', true)
        .set('user', payload.response)
        
    case LOGOUT_SUCCESS:
      return state
        .set('userLoaded', false)
        .set('user', {})

    case FETCH_AUTH_ERROR:
      return state
        .set('loaded', true)
        .set('error', error)

    case FETCH_USER_ERROR:
      return state
        .set('userLoaded', false)
        .set('user', false)

    default:
      return state
  }
}

export const fetchAuth = (username, password, history) => {
  return {
    type: FETCH_AUTH_REQUEST,
    username, password, history
  }
}

export const fetchRegister = (username, password, email, first_name, last_name, history) => {
  return {
    type: FETCH_REGISTER_REQUEST,
    username, password, email, first_name, last_name, history
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

const fetchAuthSaga = function * ({username, password, history}) {
  const authentication = {username, password}
  const csrf = getCookie('csrftoken')
  try {
    const response = yield call(axios, {
      url: `${api}/auth/`,
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': `${csrf}`
      },
      data: authentication,
    })
    yield localStorage.setItem(jwtSecretName, response.data.token)
    yield localStorage.setItem('userName', username)
    yield put({
      type: FETCH_AUTH_SUCCESS,
    })
    history.push('/account')
  } catch (error) {
    if(error.response.status == 400) alert('Введены неверные данные')
    yield put({
      type: FETCH_AUTH_ERROR,
      error
    })
  }
}

const fetchRegisterSaga = function * ({username, password, email, first_name, last_name, history}) {
  const data = {username, password, email, first_name, last_name}
  const partner_name = localStorage.getItem('partner_name')
  if(partner_name && partner_name.length !== 0) data['partner_name'] = partner_name
  const csrf = getCookie('csrftoken')
  try {
    const response = yield call(axios, {
      url: `${api}/register/`,
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': `${csrf}`
      },
      data
    })
    yield put({
      type: FETCH_REGISTER_SUCCESS,
      username, password, history
    })
  } catch (error) {
    alert(error.response.request.responseText)
    yield put({
      type: FETCH_REGISTER_ERROR,
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
    yield put({
      type: FETCH_USER_SUCCESS,
      payload: {response: response.data}
    })
  } catch (error) {
    alert(error)
    yield put({
      type: FETCH_USER_ERROR,
      error
    })
  }
}

const logoutSaga = function * (props) {
  try {
    yield localStorage.removeItem(jwtSecretName)
    console.log('token removed ---')

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
  yield takeEvery(FETCH_REGISTER_REQUEST, fetchRegisterSaga)
  yield takeEvery(FETCH_REGISTER_SUCCESS, fetchAuthSaga)
  yield takeEvery(LOGOUT_REQUEST, logoutSaga)
}
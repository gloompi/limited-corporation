import {Map, Record} from 'immutable'
import {eventChannel} from 'redux-saga'
import {put, call, takeEvery, take} from 'redux-saga/effects'
import {appName, jwtSecretName, ws} from '../../configClient'

const ReducerRecord = Record({
  message: null,
  loaded: null,
  error: null
})

export const modulName = 'counter'
export const CONNECT_REQUEST = `${appName}/${modulName}/CONNECT_REQUEST`
export const OPEN = `${appName}/${modulName}/OPEN`
export const CLOSE = `${appName}/${modulName}/CLOSE`
export const MESSAGE = `${appName}/${modulName}/MESSAGE`
export const ERROR = `${appName}/${modulName}/ERROR`

export default (state = new ReducerRecord, action) => {
  const {type, payload, error} = action
  switch (type) {
    case OPEN:
      return state.set('loaded', true)
    
    case CLOSE:
      return state.set('loaded', null)

    case MESSAGE:
      return state
        .set('message', payload.response)
        .set('loaded', true)

    case ERROR:
      return state
        .set('loaded', true)
        .set('error', true)

    default:
      return state
  }
}

export const connectToServer = () => {
  return {
    type: CONNECT_REQUEST
  }
}

const createEventChannel = function * (mySocket) {
  return eventChannel(emit => {
    mySocket.onmessage = (message) => {
      console.log(message)
      return emit(message.data)
    }
    return () => {
      mySocket.close()
    }
  })
}

const connectToServerSaga = function * () {
  try {
    const mySocket = new WebSocket(ws)
    const channel = yield call(createEventChannel, mySocket)
    while(true) {
      const {message} = yield take(channel)
      console.log(message)
      yield put({
        type: MESSAGE
      })
    }
  } catch (error) {
    console.log(error)
    yield put({
      type: ERROR,
      error
    })
  }
}

export const saga = function * () {
  yield takeEvery(CONNECT_REQUEST, connectToServerSaga)
}
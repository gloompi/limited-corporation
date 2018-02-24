import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleWare from 'redux-saga'
import {Map, Record} from 'immutable'

import createReducer from './reducers/index'
import rootSaga from './reducers/saga'
import history from './history'

const configureStore = (initialState) => {
  const sagaMiddleWare = createSagaMiddleWare()
  const enhancer = applyMiddleware(sagaMiddleWare)
  const store = createStore(createReducer(), initialState, enhancer)

  store.injectReducers = (asyncReducers) => 
    store.replaceReducer(
      createReducer(asyncReducers)
    )

  if (module.hot) {
    module.hot.accept(
      './reducers',
      () => store.replaceReducer(require('./reducers').default)
    )
  }

  sagaMiddleWare.run(rootSaga)

  return store
}

export default configureStore
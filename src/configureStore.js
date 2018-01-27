import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'

import reducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const middlewares = [
    sagaMiddleware,
    thunk
]

const enhancer = composeEnhancers(applyMiddleware(...middlewares))

export default function configureStore() {
    const store = createStore(reducer, enhancer)
    sagaMiddleware.run(rootSaga)
    return store
}
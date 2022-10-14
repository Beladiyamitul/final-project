import { all } from 'redux-saga/effects'
import { authSagaCall } from './auth.saga'




export function* rootSaga () {
    yield all ([
        authSagaCall()
    ])
}
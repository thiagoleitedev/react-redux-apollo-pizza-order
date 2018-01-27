import { takeEvery, put } from 'redux-saga/effects'
import { 
    FETCHING_DATA,
    FETCHING_DATA_SUCCESS,
    FETCHING_DATA_FAILURE
} from '../Types'
import { getPizzaSizes } from '../api/graphql'
import { apolloClient } from '../Apollo'

function* fetchData(action) {
    const response = yield apolloClient.query({
        query: getPizzaSizes,
    })
    yield put({ type: FETCHING_DATA_SUCCESS, payload: response.data })
}

function* watch() {
    yield takeEvery(FETCHING_DATA, fetchData)
}

export default watch
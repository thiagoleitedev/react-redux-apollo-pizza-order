import { takeEvery, put } from 'redux-saga/effects'
import { 
    FETCHING_PIZZA_BY_NAME,
    FETCHING_DATA_SUCCESS,
    FETCHING_DATA_FAILURE
} from '../Types'
import { getPizzaByName } from '../api/graphql'
import { apolloClient } from '../Apollo'

function* fetchData(action) {
    console.log(action)
    const response = yield apolloClient.query({
        query: getPizzaByName,
        variables: { name: "SMALL" }
    })
    yield put({ type: FETCHING_DATA_SUCCESS, payload: response.data })
}

function* watch() {
    yield takeEvery(FETCHING_PIZZA_BY_NAME, fetchData)
}

export default watch
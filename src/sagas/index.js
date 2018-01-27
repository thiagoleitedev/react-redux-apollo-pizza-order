import { all } from 'redux-saga/effects'

import GetPizzaSizes from './GetPizzaSizes'
import GetPizzaByName from './GetPizzaByName'

export default function* rootSagas () {
    yield all ([
        GetPizzaSizes(),
        GetPizzaByName()
    ])
}
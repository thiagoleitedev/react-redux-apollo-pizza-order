import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    data: (state = [], {type, payload}) => {
        switch (type) {
            case 'FETCHING_DATA_SUCCESS':
                return payload
            default:
                return state
        }
    },
    cart: (state = [], {type, payload}) => {
        switch(type) {
            case 'ADD_TO_CART':
                return [...state, payload ]
            case 'REMOVE_FROM_CART':
                return state.filter(item => item.orderId !== payload.orderId)
            default:
                return state
        }
    }
})

export default rootReducer;
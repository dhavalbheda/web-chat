import  { USER_FETCH_REQUEST, USER_FETCH_ERROR, USER_FETCH_SUCCESS, USER_LOG_OUT, SET_ALERT, REMOVE_ALERT, TAB_CHANGE } from './ActionType'

const initialState = {
    user:{},
    authenticated:false,
    currentTab: null,
    loadding: false,
    userAlert: null
}

const UserReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch(type) {
        case USER_FETCH_REQUEST:
            return {
                ...state,
                loadding: true,
            }
        case USER_FETCH_SUCCESS:
            return {
                ...state,
                user: payload,
                loadding: false,
                authenticated: true
            }
        case USER_FETCH_ERROR:
        case USER_LOG_OUT:
            return {
                ...state,
                user:{},
                loadding: false,
                authenticated: false
            }
        case TAB_CHANGE:
            return {
                ...state,
                currentTab: payload
            }
        case SET_ALERT:
            return {
                ...state,
                userAlert: payload
            }
        case REMOVE_ALERT:
            return {
                ...state,
                userAlert: null
            }
        default:
             return state
    }
} 

export default UserReducer;
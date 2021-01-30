import  { CHAT_FETCH_REQUEST, CHAT_FETCH_ERROR, CHAT_FETCH_SUCCESS, CHAT_SET_ALERT, CHAT_REMOVE_ALERT, REQUEST_CONVERSATION, SET_CONVERSATION } from './ActionType'

const initialState = {
    friends:[],
    conversation: [],
    loadding: false,
    chatAlert: null
}

const ChatReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch(type) {
        case CHAT_FETCH_REQUEST:
            return {
                ...state,
                loadding: true,
            }
        case CHAT_FETCH_SUCCESS:
            return {
                ...state,
                friends: payload,
                loadding: false,
            }
        case CHAT_FETCH_ERROR:
            return {
                ...state,
                friends:[],
                loadding: false,
            }
        case REQUEST_CONVERSATION: 
            return {
                ...state,
                loadding: true,
                conversation: []
            }
        case SET_CONVERSATION:
            return {
                ...state,
                conversation: [...state.conversation, payload],
                loadding: false
            }
        case CHAT_SET_ALERT:
            return {
                ...state,
                chatAlert: payload
            }
        case CHAT_REMOVE_ALERT:
            return {
                ...state,
                chatAlert: null
            }
        default:
             return state
    }
} 

export default ChatReducer;
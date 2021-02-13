import  { ROOM_FETCH_REQUEST, ROOM_FETCH_ERROR, ROOM_FETCH_SUCCESS, ROOM_SET_ALERT, ROOM_REMOVE_ALERT, ROOM_REQUEST_CONVERSATION, ROOM_SET_CONVERSATION, UPDATE_CONVERSATION } from './ActionType'

const initialState = {
    rooms:[],
    conversation: [],
    loadding: false,
    roomAlert: null
}

const RoomReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case ROOM_FETCH_REQUEST:
            return {
                ...state,
                loadding: true,
            }
        case ROOM_FETCH_SUCCESS:
            return {
                ...state,
                rooms: [...payload, ...payload, ...payload, ...payload, ...payload, ...payload],
                loadding: false,
            }
        case ROOM_FETCH_ERROR:
            return {
                ...state,
                rooms:[],
                loadding: false,
            }
        case ROOM_REQUEST_CONVERSATION: 
            return {
                ...state,
                loadding: true,
                conversation: []
            }
        case ROOM_SET_CONVERSATION:
            return {
                ...state,
                conversation: [...state.conversation, payload],
                loadding: false
            }
        case UPDATE_CONVERSATION:
            let conversation = state.conversation.filter(item => item.uuid !== payload.uuid);
            return {
                ...state,
                conversation: [...conversation, payload],
                loadding: false
            }
        case ROOM_SET_ALERT:
            return {
                ...state,
                roomAlert: payload
            }
        case ROOM_REMOVE_ALERT:
            return {
                ...state,
                roomAlert: null
            }
        default:
             return state
    }
} 

export default RoomReducer;
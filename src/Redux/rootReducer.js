import { combineReducers } from 'redux'

import UserReducer from './User/UserReducer'
import ChatReducer from './Chat/ChatReducer'
import RoomReducer from './Room/RoomReducer'

const rootReducer = combineReducers({
    User: UserReducer,
    Chat: ChatReducer,
    Room: RoomReducer
})

export default rootReducer
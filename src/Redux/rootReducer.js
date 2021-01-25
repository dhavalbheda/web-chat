import { combineReducers } from 'redux'

import UserReducer from './User/UserReducer'
import ChatReducer from './Chat/ChatReducer'

const rootReducer = combineReducers({
    User: UserReducer,
    Chat: ChatReducer
})

export default rootReducer
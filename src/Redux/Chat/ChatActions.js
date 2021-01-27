import  { CHAT_FETCH_REQUEST, CHAT_FETCH_ERROR, CHAT_FETCH_SUCCESS, CHAT_SET_ALERT, CHAT_REMOVE_ALERT, REQUEST_CONVERSATION, SET_CONVERSATION } from './ActionType'
import firebase from './../../config/firebaseConfig';
const db = firebase.firestore();

// =========> All The Action Types 
// Chat Request
export const chatRequest = () => {
    return {
        type: CHAT_FETCH_REQUEST,
        payload: null
    }
}

// Chat Success
export const chatSuccess = (data) => {
    return {
        type: CHAT_FETCH_SUCCESS,
        payload: data
    }
}

// Chat Error
export const chatError = (error=null) => {
    return {
        type: CHAT_FETCH_ERROR,
        payload: error
    }
}

export const requestConversation = (data = null) => 
{
    return {
        type: REQUEST_CONVERSATION,
        payload: data
    }
}
export const setConversation = (data = null) => {
    return {
        type: SET_CONVERSATION,
        payload: data,
    }
}

// Set Alert
export const setAlert = (data) => {
    return {
        type: CHAT_SET_ALERT,
        payload: data
    }
}

// Remove Alert
export const removeAlert = (data) => {
    return {
        type: CHAT_REMOVE_ALERT,
        payload: data
    }
}


//=========================> All The Actions

// Get All Message
export const getAllFriends = (uid) => {
    return async dispatch => {
        const unsubscribe = db.collection('users').onSnapshot((querySnapshot) => {
            const friends = [];
            querySnapshot.forEach(function(doc) {
                if(doc.data().uid !== uid)
                    friends.push(doc.data());
            })
            dispatch(chatSuccess(friends));

        })
        return unsubscribe;
    }
}

// Send Message
export const saveMessage = ({sender, receiver, message}) => {
    return async dispatch => {
        const conversion = db.collection('conversation');
        conversion.add({
            sender,
            receiver,
            message,
            isSeen: false,
            createdAt: new Date()
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error));
    }
}

// Get Conversation
export const getConversation = ({sender, receiver}) => {
    return async dispatch => {
        console.log(receiver);
        dispatch(requestConversation());
        db.collection('conversation')
        .where('sender', 'in', [sender, receiver])
        .orderBy('createdAt', 'asc')
        .onSnapshot(querySnapshot => {
            const conversations = [];
            querySnapshot.forEach(doc => {
                if((doc.data().sender === sender && doc.data().receiver === receiver) || (doc.data().sender === receiver && doc.data().receiver === sender))
                {
                    conversations.push(doc.data())
                }
            });
            dispatch(setConversation(conversations));
        })
    }   
}
import  { CHAT_FETCH_REQUEST, CHAT_FETCH_ERROR, CHAT_FETCH_SUCCESS, CHAT_SET_ALERT, CHAT_REMOVE_ALERT } from './ActionType'
import firebase from './../../config/firebaseConfig';
const db = firebase.firestore();
const auth = firebase.auth();

// =========> All The Action Types 
export const chatRequest = () => {
    return {
        type: CHAT_FETCH_REQUEST,
        payload: null
    }
}

export const chatSuccess = (data) => {
    return {
        type: CHAT_FETCH_SUCCESS,
        payload: data
    }
}

export const chatError = (error=null) => {
    return {
        type: CHAT_FETCH_ERROR,
        payload: error
    }
}


export const setAlert = (data) => {
    return {
        type: CHAT_SET_ALERT,
        payload: data
    }
}

export const removeAlert = (data) => {
    return {
        type: CHAT_REMOVE_ALERT,
        payload: data
    }
}


//=========================> All The Actions

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
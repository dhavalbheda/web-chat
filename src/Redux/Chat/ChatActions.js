import  { CHAT_FETCH_REQUEST, CHAT_FETCH_ERROR, CHAT_FETCH_SUCCESS, CHAT_SET_ALERT, CHAT_REMOVE_ALERT, REQUEST_CONVERSATION, SET_CONVERSATION, UPDATE_CONVERSATION } from './ActionType'
import firebase from './../../config/firebaseConfig';
import { setTabChange } from '../User/UserActions';
const db = firebase.firestore();
const rdb = firebase.database();
const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
const arrayRemove = firebase.firestore.FieldValue.arrayRemove;

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

export const updateConversation = (data = null) => {
    return {
        type: UPDATE_CONVERSATION,
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
export const saveMessage = async({uuid, sender, receiver, message}) => {
    rdb.ref().child(sender + "-" + receiver).push().set({
        uuid,
        sender,
        receiver,
        message,
        isSeen: false,
        createdAt: firebase.database.ServerValue.TIMESTAMP
    })
    db.collection('users').doc(sender).update({pendding: arrayUnion(receiver)});
}

// Get Conversation
export const getConversation = ({sender, receiver}) => {
    return async dispatch => {
        dispatch(requestConversation());
        rdb.ref().child(sender + "-" + receiver).on('child_added', snap => {
           dispatch(setConversation(snap.val()));
        })
        rdb.ref().child(receiver + "-" + sender).on('child_added', snap => {
            if(!snap.val().isSeen) {
                rdb.ref().child(receiver + "-" + sender).child(snap.key).update({isSeen: true});
                db.collection('users').doc(receiver).update({pendding: arrayRemove(sender)});
            }
            dispatch(setConversation(snap.val()));
        })
        rdb.ref().child(sender + "-" + receiver).on('child_changed', snap => {
            dispatch(updateConversation(snap.val()))
        })
    }  
}

export const removeLister = (sender, receiver) => {
    rdb.ref().child(sender + "-" + receiver).off('child_added');
    rdb.ref().child(sender + "-" + receiver).off('child_changed');
    rdb.ref().child(receiver + "-" + sender).off('child_added');
}
import  { ROOM_FETCH_REQUEST, ROOM_FETCH_SUCCESS, ROOM_REQUEST_CONVERSATION, ROOM_SET_CONVERSATION } from './ActionType'
import firebase from './../../config/firebaseConfig';

const db = firebase.firestore();
const rdb = firebase.database().ref().child('rooms');

// =========> All The Action Types 
// Room Request
export const roomRequest = () => {
    return {
        type: ROOM_FETCH_REQUEST,
        payload: null
    }
}

// Room Success
export const roomSuccess = (data) => {
    return {
        type: ROOM_FETCH_SUCCESS,
        payload: data
    }
}

// Request Conversation
export const requestConversation = (data = null) => 
{
    return {
        type: ROOM_REQUEST_CONVERSATION,
        payload: data
    }
}

// Set Conversation
export const setConversation = (data = null) => {
    return {
        type: ROOM_SET_CONVERSATION,
        payload: data,
    }
}


//=========================> All The Actions

// Get All Rooms
export const getAllRooms = () => {
    return async dispatch => {
        const unsubscribe = db.collection('rooms').onSnapshot((querySnapshot) => {
            const rooms = [];
            querySnapshot.forEach(function(doc) {
                doc.data().name.map(item => rooms.push(item));
            });
            dispatch(roomSuccess(rooms));
        })
        return unsubscribe;
    }
}


// Send Message
export const saveMessage = async({uuid, name, sender, roomid, message}) => {
    // Save Message
    rdb.child(roomid).push().set({
        uuid,
        name,
        sender,
        roomid,
        message,
        createdAt: firebase.database.ServerValue.TIMESTAMP
    })
}

// Get All Conversation
export const getConversation = (roomid) => {
    return async dispatch => {
        dispatch(requestConversation());
        rdb.child(roomid).on('child_added', snap => {
           dispatch(setConversation(snap.val()));
        })
    }
}

export const removeLister = (roomid) => {
    if(roomid)
        rdb.child(roomid).off('child_added');
}
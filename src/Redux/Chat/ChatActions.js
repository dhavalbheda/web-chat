import  { CHAT_FETCH_REQUEST, CHAT_FETCH_ERROR, CHAT_FETCH_SUCCESS, CHAT_SET_ALERT, CHAT_REMOVE_ALERT, REQUEST_CONVERSATION, SET_CONVERSATION, UPDATE_CONVERSATION } from './ActionType'
import firebase from './../../config/firebaseConfig';

const db = firebase.firestore();
const rdb = firebase.database().ref().child('conversation');
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
        db.collection('users').onSnapshot((querySnapshot) => {
            const friends = [];
            querySnapshot.forEach(function(doc) {
                if(doc.data().uid !== uid) {
                    friends.push(doc.data());
                }
            })
            if(friends.length)
                getLastSender(friends, uid, dispatch);
        })
    }
}

const getLastSender = async(friends, uid, dispatch) => {
    db.collection('users').doc(uid).get()
    .then(user => {
        let lastMessage = user.data().lastMessage;
        let index = lastMessage.length;
        lastMessage.map((item) => {
            index--;
            let oldIndex = friends.findIndex(friend => friend.uid === item);
            let newArray = array_move(friends, oldIndex, index);
            dispatch(chatSuccess(newArray));
        })
    })
}

function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

// Send Message
export const saveMessage = async({uuid, sender, receiver, message}) => {
    // Save Message
    rdb.child(sender + "-" + receiver).push().set({
        uuid,
        sender,
        receiver,
        message,
        isSeen: false,
        createdAt: firebase.database.ServerValue.TIMESTAMP
    })
    // Save Total Unseen Message
    rdb.child(sender + "-" + receiver)
            .orderByChild('isSeen')
            .equalTo(false).once('value')
            .then(data => {
                let totalUnseen = Object.keys(data.val()).length;
                db.collection('users').doc(sender).update({pending: arrayRemove({receiver: receiver, totalUnseen: totalUnseen - 1})});
                db.collection('users').doc(sender).update({pending: arrayUnion({receiver, totalUnseen})});

                db.collection('users').doc(receiver).update({lastMessage: arrayRemove(sender)});
                db.collection('users').doc(receiver).update({lastMessage: arrayUnion(sender)});
                db.collection('users').doc(sender).update({lastMessage: arrayRemove(receiver)});
                db.collection('users').doc(sender).update({lastMessage: arrayUnion(receiver)});

            });
}

// Get Conversation
export const getConversation = ({sender, receiver}) => {
    return async dispatch => {
        dispatch(requestConversation());
        // Sender to Receiver Message
        rdb.child(sender + "-" + receiver).on('child_added', snap => {
           dispatch(setConversation(snap.val()));
        })

        // Receiver to Sender Message
        rdb.child(receiver + "-" + sender).on('child_added', snap => {
            if(!snap.val().isSeen) {
                rdb.child(receiver + "-" + sender).child(snap.key).update({isSeen: true});
                db.collection('users').doc(receiver).update({pending: arrayRemove({reciver: sender})});
                removeTotalUnseen(sender, receiver);
            }
            dispatch(setConversation(snap.val()));
        })

        // Message Status Change Event Listener
        rdb.child(sender + "-" + receiver).on('child_changed', snap => {
            dispatch(updateConversation(snap.val()))
        })
    }  
}

export const removeLister = (sender, receiver) => {
    rdb.child(sender + "-" + receiver).off('child_added');
    rdb.child(sender + "-" + receiver).off('child_changed');
    rdb.child(receiver + "-" + sender).off('child_added');
}

const removeTotalUnseen = (sender, receiver) => {
    db.collection('users').doc(receiver).get().then(snap => {
        snap.data().pending.map(item => {
            if (item.receiver === sender) {
                db.collection('users').doc(receiver).update({pending: arrayRemove({receiver: sender, totalUnseen: item.totalUnseen})});;
            }
            return null;
        })
    })
}
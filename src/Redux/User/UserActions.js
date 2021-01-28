import  { USER_FETCH_REQUEST, USER_FETCH_ERROR, USER_FETCH_SUCCESS, SET_ALERT, REMOVE_ALERT, USER_LOG_OUT, TAB_CHANGE } from './ActionType'
import firebase from './../../config/firebaseConfig';
const db =firebase.firestore();
const auth = firebase.auth();

// =====================> All The Action Types 
export const fetchRequest = () => {
    return {
        type: USER_FETCH_REQUEST,
        payload: null
    }
}

export const fetchSuccess = (data) => {
    return {
        type: USER_FETCH_SUCCESS,
        payload: data
    }
}

export const fetchError = (error=null) => {
    return {
        type: USER_FETCH_ERROR,
        payload: error
    }
}

export const reqLogOut = () => {
    return {
        type: USER_LOG_OUT,
        payload: null
    }
}
export const setTabChange = (data) => {
    return {
        type: TAB_CHANGE,
        payload: data
    }
}
export const setAlert = (data) => {
    return {
        type: SET_ALERT,
        payload: data
    }
}

export const removeAlert = (data) => {
    return {
        type: REMOVE_ALERT,
        payload: data
    }
}


//=========================> All The Actions

// Register User
export const signUpUser = (user, confirmPassword) => {
    return dispatch => {
        if(user.password !== confirmPassword) {
            dispatch(setAlert({type:'danger', message: "Password and Confirm Password does not match"}))
            setTimeout(() => dispatch(removeAlert()), 3000);
        } else {
            dispatch(fetchRequest());
            registerUserWithEmail(user, dispatch);
        } 
    }
}

// Register User With Email
const registerUserWithEmail = (data, dispatch) => {
    // Creating A User With Email And Password
    auth.createUserWithEmailAndPassword(data.email, data.password)
    .then(user => {
        updateCurrentUserDetail(user, data, dispatch);
    })
    .catch(error => {
        dispatch(setAlert({type:'danger', message: error.message}))
        setTimeout(() => dispatch(removeAlert()), 3000);
    })
}

// Upadate Current User Detail
const updateCurrentUserDetail = (user, data, dispatch) => {
    const { firstName, lastName, email } = data;
    const currentUser = auth.currentUser;
    currentUser.updateProfile({ firstName, lastName,})
    .then( () => {
        // Save To The Database
        db.collection('users').doc(user.user.uid).set({
            firstName,
            lastName,
            email,
            uid: user.user.uid,
            isActive: true,
            createdAt: new Date()
        })
        .then(() => {
            localStorage.setItem('userId', user.user.uid);
            dispatch(fetchSuccess({firstName, lastName, email, uid: user.user.uid}));
            dispatch(setAlert({type:'success', message: "User Registerd Successfull"}))
            setTimeout(() => dispatch(removeAlert()), 3000);
        })
    })
    .catch(error => {
        dispatch(setAlert({type:'danger', message: error.message}))
        setTimeout(() => dispatch(removeAlert()), 3000);
    })
}

// Fetch Current User Detail
export const fetchCurrentUserDetail = () => {
    return dispatch => {
        // Check If user is signedin or not
        auth.onAuthStateChanged( async(user) => {
            if (user) {
                const userRef = firebase.firestore().collection('users').doc(user.uid);
                const doc = await userRef.get();
                if (!doc.exists) {
                    dispatch(setAlert({type:'danger', message: "Your Account Terminated, So Please Register With New Email.."}));
                    setTimeout(() => dispatch(removeAlert()), 3000);
                    dispatch(fetchError(''));
                } else {
                    const {firstName, lastName, email, uid} = doc.data();
                    dispatch(fetchSuccess({firstName, lastName, email, uid}));
                }
            } else {
                dispatch(setAlert({type:'warning', message: "You Logged Out Please Login"}));
                setTimeout(() => dispatch(removeAlert()), 3000);
                dispatch(fetchError(''));
            }
        })
    }
}

// Sign In Action
export const signInUser = (data) => {
    return async dispatch => {
        if(data.email === '' || data.password < 6) {
            dispatch(setAlert({type:'warning', message: "Email is required!\n Password Must be more than 6 letter"}));
            setTimeout(() => dispatch(removeAlert()), 3000);
        } else {
            dispatch(fetchRequest());
            auth.signInWithEmailAndPassword(data.email, data.password)
            .then((user) => {
                db.collection('users').doc(user.user.uid).update({
                    isActive: true
                })
                .then(() => {
                    localStorage.setItem('userId', user.user.uid);
                    dispatch(setAlert({type:'success', message: 'Sign In Successfully'}));
                    setTimeout(() => dispatch(removeAlert()), 3000);
                })
                .catch(error => {
                    dispatch(setAlert({type:'danger', message: error.message}))
                    setTimeout(() => dispatch(removeAlert()), 3000);
                })
            })
            .catch(error => {
                dispatch(setAlert({type:'danger', message: error.message}))
                setTimeout(() => dispatch(removeAlert()), 3000);
            })
        }
    }
}

// Logout User
export const logoutUser = (uid) => {
    return dispatch => {
        dispatch(fetchRequest());
        db.collection('users').doc(uid)
        .update({isActive: false})
        .then(() => {
            auth.signOut()
            .then(() => {
                dispatch(reqLogOut());
                dispatch(setAlert({type:'success', message: "Logout Successfully"}))
                setTimeout(() => dispatch(removeAlert()), 3000);
            })
            .catch(error => {
                dispatch(setAlert({type:'danger', message: error.message}))
                setTimeout(() => dispatch(removeAlert()), 3000);
            })   
        })
        .catch(error => {
            dispatch(setAlert({type:'danger', message: error.message}))
            setTimeout(() => dispatch(removeAlert()), 3000);
        })
        
    }
}

export const userTabChange = (uid, friendId) => {
  return async dispatch => db.collection('users').doc(uid)
        .update({currentTab: friendId})
        .then(() => {
            dispatch(setTabChange(friendId));
        })
}
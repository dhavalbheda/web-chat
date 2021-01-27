import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllFriends, getConversation, saveMessage } from '../../Redux/Chat/ChatActions';
import Header from '../Header/Header'
import './style.css';

/**
* @author DhavalBheda
* @function Chat
**/

const Chat = (props) => {
  const { user } = useSelector(state => state.User);
  const { conversation } = useSelector(state => state.Chat);
  const { friends } = useSelector(state => state.Chat);
  const [startChat, setStartChat] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState({});
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  let unsubsribe;

  useEffect(() => {
      unsubsribe = dispatch(getAllFriends(user.uid))
      .then(unsubscribeMehod => unsubscribeMehod)
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    return () => unsubsribe.then(f => f()).catch(error => console.log(error));
  }, []);
  
  const selectFriend = (friend) => {
    setStartChat(true);
    setSelectedFriend(friend);
    dispatch(getConversation({
      sender: user.uid,
      receiver: friend.uid}));
  }

  const sendMessage = () => {
    const data = {
      sender: user.uid,
      receiver: selectedFriend.uid,
      message: text
    }
    dispatch(saveMessage(data));
  }
  return(
        <Fragment>
          <Header/>
          <section className="container-body">
            <div className="listOfUsers">
              {friends.length > 0 && <LoadFriends selectFriend={selectFriend} friends={friends} />}
            </div>
            <div className="chatArea">
                <div className="chatHeader"> 
                  {startChat && selectedFriend.firstName + " " + selectedFriend.lastName}
                </div>
                <div className="messageSections">
                    {
                      startChat && 
                      conversation.map((item, key) => {
                       return <div key={key} style={{ textAlign: item.sender === user.uid ? 'right' : 'left'}}>
                                <p className={item.sender === user.uid ? 'messageStyle right-message' : 'messageStyle left-message'} >{item.message}</p>
                              </div>
                      })
                    }
                </div>
                <div className="chatControls">
                  {
                    startChat && <Fragment>
                        <textarea
                            placeholder = 'Enter Text...'
                            value = {text}
                            onChange = {e => setText(e.target.value)}></textarea>
                      <button onClick={sendMessage}>Send</button>
                    </Fragment>
                  }
                    
                </div>
              </div>
          </section>
        </Fragment>
   )
}

const LoadFriends = ({friends, selectFriend}) => {
  return friends.map((friend, index) => 
    <div key={index} className="displayName" onClick = {() => selectFriend(friend)}>
      <div className="displayPic">
          <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
      </div>
      <div style={{display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
          <span style={{fontWeight: 500}}>{friend.firstName + " " + friend.lastName}</span>
          <span>{friend.isActive ? 'Active' : 'offline'}</span>
      </div>
    </div>
  )
}


export default Chat;

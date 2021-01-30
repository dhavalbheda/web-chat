import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllFriends, getConversation, saveMessage } from '../../Redux/Chat/ChatActions';
import Header from '../Header/Header'
import './style.css';
import ScrollToBottom from 'react-scroll-to-bottom';

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
    window.receiver = friend.uid;  
    dispatch(getConversation({
      sender: user.uid,
      receiver: friend.uid}));
    }

  const sendMessage = () => {
    setText('');
    const data = {
      sender: user.uid,
      receiver: selectedFriend.uid,
      message: text
    }
    window.receiver = selectedFriend.uid;
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
                <ScrollToBottom className="messageSections">
                    {
                      startChat && <ChatComponent conversation = {conversation} selectedFriend = {selectedFriend} user = {user}  />
                    }
                </ScrollToBottom>
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
          <img src="https://i.pinimg.com/originals/86/63/78/866378ef5afbe8121b2bcd57aa4fb061.jpg" alt="" />
      </div>
      <div style={{display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
          <span style={{fontWeight: 500}}>{friend.firstName + " " + friend.lastName}</span>
          <span>{friend.isActive ? 'Active' : 'offline'}</span>
      </div>
    </div>
  )
}

const ChatComponent = ({conversation, selectedFriend, user}) => {
  
  const sortCoversation = (data2) => {
    let data = data2;
    data.sort((a, b) => a.createdAt - b.createdAt);
  }

  sortCoversation(conversation)
  return conversation.map((item, key) => {
    let createdAt = undefined;
    if(item.createdAt != null) {
      let options = { weekday: 'short', day: 'numeric', month: 'numeric'};
      createdAt = new Date(item.createdAt).toLocaleString('en', options);
      createdAt += " " + new Date(item.createdAt).toLocaleTimeString([], {timeStyle: 'short'});
    }
    return (item.sender === selectedFriend.uid && item.receiver === user.uid) || (item.sender === user.uid && item.receiver === selectedFriend.uid)
    ? <div key={key} style={{ textAlign: item.sender === user.uid ? 'right' : 'left'}}>
            <p className={item.sender === user.uid ? 'messageStyle right-message' : 'messageStyle left-message'} >{item.message}<br/><span className="message-time">{createdAt? createdAt : ''}</span></p>
      </div>
    : <Fragment key={key}></Fragment>
  })
}


export default Chat;

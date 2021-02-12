import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ScrollToBottom from 'react-scroll-to-bottom';
import Picker from 'emoji-picker-react';

// User Define
import './../Utils/css/font-awesome.css';
import './style.css';
import { getAllFriends, getConversation, removeLister, saveMessage } from '../../Redux/Chat/ChatActions';
import ConversationComponent from './ConversationComponent';
import Sidebar from './Sidebar';

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
  const [emojiPickerClick, setEmojiPickerClick] = useState(false);
  const dispatch = useDispatch();

  let unsubscribe;
  useEffect(() => {
      unsubscribe = dispatch(getAllFriends(user.uid))
      .then(unsubscribeMehod => unsubscribeMehod)
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    return () => removeLister(user.uid, selectedFriend.uid);
  }, [selectedFriend]);
  

   // Friend Click Listener
  const selectFriend = (friend) => {
    if(selectedFriend && selectedFriend.uid === friend.uid)
      return;
    setStartChat(true);
    setEmojiPickerClick(false);
    setText('');
    setSelectedFriend(friend);  
    dispatch(getConversation({
        sender: user.uid,
        receiver: friend.uid}))
  }

  // Message Send Button
  const sendMessage = () => {
    setText('');
    const data = {
      uuid: uuidv4(),
      sender: user.uid,
      receiver: selectedFriend.uid,
      message: text
    }
    saveMessage(data);
  }

  // Emoji Button Click Listener
  const onEmojiClick = (event, {emoji}) => {
    setText(text +  emoji);
  };


  return(
        <Fragment>
        <div className="main-container">
            {/* <!-- Sidebar --> */}
            <Sidebar
                uid={user.uid}
                selectFriend={selectFriend}
                friends={friends}
                selectedFriend={selectedFriend} />

            {/* <!-- Chat Body --> */}
            <div className="container-body">
                {/* <!-- Chat Header --> */}
                <div className="friend-name">
                    <span>{startChat && selectedFriend.firstName + " " + selectedFriend.lastName}</span>
                </div>
                
                {/* Message Area */}
                <ScrollToBottom className="message-section">
                    {
                      startChat && <ConversationComponent 
                                      conversation = {conversation}
                                      selectedFriend = {selectedFriend} 
                                      user = {user}/>
                    }
                </ScrollToBottom>
                {/* <!-- Control Area --> */}
                {
                  startChat && <ControlComponent 
                                text={text} 
                                setText={setText}
                                setEmojiPickerClick={setEmojiPickerClick}
                                sendMessage={sendMessage}
                                emojiPickerClick={emojiPickerClick}
                                onEmojiClick={onEmojiClick} />
                }
            </div>
        </div>
    </Fragment>
   )
}



const ControlComponent = ({text, setText, setEmojiPickerClick, sendMessage, emojiPickerClick, onEmojiClick}) => {
  return <Fragment>
    <div className="chat-control">
      <div className="control">
          <textarea
                  placeholder = 'Enter Text...'
                  value = {text}
                  onChange = {e => {
                      setText(e.target.value)
                  }}>
          </textarea>
          <span className="smile-icon" onClick={e=> setEmojiPickerClick(!emojiPickerClick)}><i className="fas fa-smile"></i></span>
          <span className="send-icon" onClick={sendMessage}><i className="fas fa-paper-plane"></i></span>
      </div>
      {emojiPickerClick && <Picker onEmojiClick={onEmojiClick} />}
    </div>
  </Fragment>
}
export default Chat;
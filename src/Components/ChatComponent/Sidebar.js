import React, { Fragment } from 'react';

const Sidebar = ({uid, selectFriend, friends, selectedFriend}) => {
    
    // Bar Click Listener
    const barClick = () => {
        const bar = document.getElementsByClassName('navigation')[0];
        if(bar.offsetWidth < 300) {
            bar.style.width = "300px";
            document.getElementsByClassName('bar-area')[0].style.width = "300px";
        } else {
            bar.style.width = "55px";
            document.getElementsByClassName('bar-area')[0].style.width = "55px";
        }
    }

    return <Fragment>
        <div className="navigation">
            <div className="bar-area">
                <span className="icon bar-icon" onClick={barClick}><i className="fas fa-bars"></i></span>
                <div className="chat-panel">
                    <span>Group</span>
                    <span>Private</span>
                </div>
            </div>
            <ul>
                {friends.length > 0 && <LoadFriends
                                            uid={uid}
                                            selectFriend={selectFriend}
                                            friends={friends}
                                            selectedFriend={selectedFriend} />}
            </ul>
        </div>
    </Fragment>
}

const LoadFriends = ({friends, selectFriend, uid, selectedFriend}) => {

    // Check Pending Message 
    const checkUnseen = (friend) => {
      if(friend.pending) {
        let flg = friend.pending.filter(item => item.receiver === uid);
        if(flg.length) {
          return flg[0].totalUnseen;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  
    return friends.map((friend, index) => 
          {
            let pending =  checkUnseen(friend);
            return(
            <li key={index}>
              <div style={selectedFriend.uid === friend.uid ? {background: '#b1b1b1'} : {}} key={index} onClick = {() => selectFriend(friend)}>
                  {pending && <span className="pending-message">{pending}</span>}
                  <span className="icon"><img className="icon" src="https://i.pinimg.com/originals/86/63/78/866378ef5afbe8121b2bcd57aa4fb061.jpg" alt="" /></span>
                  <span className="title">{friend.firstName + " " + friend.lastName}</span>
              </div>
            </li>
            );
          }
    )
  }

export default Sidebar;
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import brandIcon from '../Utils/images/brand.png' ;
import userIcon from '../Utils/images/user-icon.png';

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
                <div className="brand-panel" onClick={barClick}>
                    <img className="brand-icon" alt="" src={brandIcon} />
                </div>
                <div className="chat-option" style={{borderBottom:'2px solid green', borderTop: '8px solid green', background: '#00800036'}}>
                  <span className="icon private"><i class="fas fa-user"></i></span>
                  <span className="title title-private">Private</span>
                </div> 
                <Link to='/group' className="selected-option">
                  <div className="chat-option" style={{borderBottom:'8px solid green'}}>
                    <span className="icon"><i class="fas fa-users"></i></span>
                    <span className="title">Group</span>
                  </div>
                </Link>
            </div>
            <ul>
                {friends.length && <LoadFriends
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
              <div style={selectedFriend.uid === friend.uid ? {background: '#0a762233'} : {}} key={index} onClick = {() => selectFriend(friend)}>
                  {pending && <span className="pending-message">{pending}</span>}
                  <span className="icon"><img className="icon" src={userIcon} alt="" /></span>
                  <span className="title">{friend.firstName + " " + friend.lastName}</span>
              </div>
            </li>
            );
          }
    )
  }

export default Sidebar;
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './style.css'
import { logoutUser } from './../../Redux/User/UserActions';


/**
* @author   Dhaval Bheda
* @function Header
**/

const Header = (props) => {
    const { user } = useSelector(state => state.User);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(logoutUser(user.uid));
    }  
    return(   
        <header className="header">
            <div style={{display: 'flex'}}>
                <div className="logo">
                    Digital Jalebi
                </div>
            </div>
            <div style={{margin:'20px 0px', color: '#fff', fontWeight: 'bold'}}>{"I'm " + user.firstName + " " + user.lastName}</div>
            <ul className="menu">
                <li>
                    <Link to="/signin" onClick={logout}>LogOut</Link>
                </li>
            </ul>
        </header>
    )
 }

export default Header
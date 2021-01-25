import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from './../../Redux/User/UserActions';
import Alert from '../Layout/Alert';


/**
* @author DhavalBheda
* @function SignIn Component
 **/

const SignIn = () => {
    const { userAlert, authenticated } = useSelector(state => state.User);
    const [email, setEmail] = useState('1dhavalbhedadb@gmail.com');
    const [password, setPassword] = useState('123456');
    const dispatch = useDispatch();

    const onsubmit = (e) => {
        e.preventDefault();
        dispatch(signInUser({ email, password}));
    }
    return  <div className="container">
                {userAlert && <Alert alert={userAlert} />}
                {authenticated && <Redirect to="/" />}
                <div className="row justify-content-center justify-content-md-start">
                    <div className="col-10 col-md-4 login-form ml-md-5 align-self-center">
                        <form>
                            <div className="form-group row">
                                <img alt="signin" src="https://media.giphy.com/media/kcZlnhiaB1p76tKS6S/giphy.gif" />
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label align-self-start ml-md-5">Email</label>
                            </div>
                            <div className="form-group row justify-content-center mb-4">
                                <div className="col-sm-10">
                                    <input  type="text"
                                            className="form-control" 
                                            id="staticEmail" 
                                            placeholder="email@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} />;
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label ml-md-5">Password</label>
                            </div>
                            <div className="form-group row justify-content-center mb-4">
                                <div className="col-sm-10">
                                    <input  type="password"
                                            className="form-control"
                                            id="inputPassword"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group row justify-content-center">
                                <button className="btn btn-primary m-2" onClick={e => onsubmit(e)}>Sign In</button>
                                <NavLink to="/signup" className="btn btn-primary m-2">Sign Up</NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>;
}
 
export default SignIn
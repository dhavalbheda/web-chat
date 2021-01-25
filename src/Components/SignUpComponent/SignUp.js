import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signUpUser } from '../../Redux/User/UserActions';
import Alert from '../Layout/Alert';

/**
* @author DhavalBheda
* @function SignUp Component
 **/

const SignUp = () => {
    const { userAlert } = useSelector(state => state.User);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();

    const onsubmit = (e) => {
        e.preventDefault();
       dispatch(signUpUser({firstName, lastName, email, password}, confirmPassword));
    }

    return  <div className="container">
                {userAlert && <Alert alert={userAlert} />}
                <div className="row justify-content-center justify-content-md-start">
                    <div className="col-10 col-md-4 login-form ml-md-5 align-self-center">
                        <form>
                            <div className="form-group row">
                                <img alt="signin" src="https://media.giphy.com/media/kcZlnhiaB1p76tKS6S/giphy.gif" />
                            </div>
                            {/* First Name */}
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col col-form-label align-self-start ml-md-5">First Name</label>
                            </div>
                            <div className="form-group row justify-content-center mb-4">
                                <div className="col-sm-10">
                                    <input  type="text"
                                            className="form-control"
                                            placeholder="Enter First Name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                            </div>

                            {/* Last Name */}
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col col-form-label align-self-start ml-md-5">Last Name</label>
                            </div>
                            <div className="form-group row justify-content-center mb-4">
                                <div className="col-sm-10">
                                    <input  type="text"
                                            className="form-control"
                                            placeholder="Enter Last Name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}  />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col col-form-label align-self-start ml-md-5">Email</label>
                            </div>
                            <div className="form-group row justify-content-center mb-4">
                                <div className="col-sm-10">
                                    <input  type="text"
                                            className="form-control"
                                            placeholder="Enter Email Id"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="form-group row">
                                <label htmlFor="inputPassword" className="col col-form-label ml-md-5">Password</label>
                            </div>
                            <div className="form-group row justify-content-center mb-4">
                                <div className="col-sm-10">
                                    <input  type="password"
                                            className="form-control"
                                            placeholder="Enter Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="form-group row">
                                <label htmlFor="inputPassword" className="col col-form-label ml-md-5">Confirm Password</label>
                            </div>
                            <div className="form-group row justify-content-center mb-4">
                                <div className="col-sm-10">
                                    <input  type="password"
                                            className="form-control"
                                            placeholder="Enter Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row justify-content-center">
                            <button className="btn btn-primary m-2" onClick={(e) => onsubmit(e)}>Sign Up</button>
                                <NavLink to="/signin" className="btn btn-primary m-2">I Have Account</NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>;
}
 
export default SignUp
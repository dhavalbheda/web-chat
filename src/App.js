import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
// import Chat from './Components/ChatComponent/Chat';
import PrivateRoute from './Components/Layout/PrivateRoute';
import Room from './Components/RoomComponent/Room';
import SignIn from './Components/SignInComponent/SignIn';
import SignUp from './Components/SignUpComponent/SignUp';
import { fetchCurrentUserDetail } from './Redux/User/UserActions';

const App = () =>  {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUserDetail());
  }, [dispatch]);

  return (
    <div className="App" style={{height:'100%'}}>
        <Router>
          <Route path="/signin"  component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute exact path="/" component={Room} />
          {/* <PrivateRoute exact path="/private" component={Chat} />  */}
        </Router>
    </div>
  );
}

export default App

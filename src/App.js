import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Chat from './Components/ChatComponent/Chat';
import PrivateRoute from './Components/Layout/PrivateRoute';
import SignIn from './Components/SignInComponent/SignIn';
import SignUp from './Components/SignUpComponent/SignUp';
import { fetchCurrentUserDetail, userTabClose } from './Redux/User/UserActions';



const App = () =>  {
  const { user } = useSelector(state => state.User);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUserDetail());
  }, []);

  return (
    <div className="App">
        <Router>
          <Route path="/signin"  component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute exact path="/" component={Chat} />
        </Router>
    </div>
  );
}

export default App

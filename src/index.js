import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './Redux/store';

class BrowserUnload extends Component {
  componentDidMount() {
    window.addEventListener("beforeunload", function confirmExit()
      {
        return "show warning";
      } );
 }
 render() {
   return <div></div>
 }
}


ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
      <App />
      <BrowserUnload/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import './App.css';

import Home from './views/Home';
import VideoInput from './views/VideoInput';
import InputContainer from './containers/InputContainer';
import Input from './views/Input';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={createHistory({ basename: process.env.PUBLIC_URL })}>
          <div className="route">
            <Route exact path="/" component={Home} />
            <Route exact path="/input" component={Input} />
            <Route exact path="/photo" component={InputContainer} />
            <Route exact path="/camera" component={VideoInput} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

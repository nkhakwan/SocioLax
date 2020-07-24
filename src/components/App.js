import React from 'react';
import '../App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from './home/Landing'
import SignIn from "./SignIn"
import TheController from './SocioLax/TheController';


function App() {
  return (
    <Router>
      <SignIn />
      <Switch>
        <Route path="/SocioLax">
          <TheController />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

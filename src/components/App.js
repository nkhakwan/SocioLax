import React, { useState } from 'react';
import '../App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from './home/Landing'
import SignIn from "./SignIn"
import TheController from './SocioLax/TheController';
import { UserContext, AddPostContext } from './userContext';


function App() {
  const [value, setValue] = useState(null);
  // const [addPost, setAddPost] = useState(false);

  return (
    <Router>

      <UserContext.Provider value={{ value, setValue }} >
        {/* <AddPostContext.Provider value={{ addPost, setAddPost }}> */}
        {/* <UserContext.Provider value={{ value, setValue }} > */}
        <SignIn />
        <Switch>
          <Route path="/SocioLax">
            <TheController />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
        {/* </AddPostContext.Provider> */}
      </UserContext.Provider>

    </Router >
  );
}

export default App;

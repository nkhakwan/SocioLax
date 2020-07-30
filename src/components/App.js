import React, { useState } from 'react';
import '../App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from './home/Landing'
import SignIn from "./SignIn"
import TheController from './SocioLax/TheController';
import PostsList from './SocioLax/PostsList';
import AllUsers from './SocioLax/AllUsers';
import { UserContext } from './userContext';
import NewPostForm from './SocioLax/NewPostForm';


function App() {
  const [value, setValue] = useState(false);

  return (
    <Router>

      <UserContext.Provider value={{ value, setValue }} >
        {/* <AddPostContext.Provider value={{ addPost, setAddPost }}> */}
        {/* <UserContext.Provider value={{ value, setValue }} > */}
        <SignIn />
        <Switch>
          <Route exact path="/SocioLax">
            <TheController />
          </Route>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/PostsList">
            <PostsList />
          </Route>
          <Route exact path="/NewPostForm">
            <NewPostForm />
          </Route>
          <Route exact path="/AllUsers">
            <AllUsers />
          </Route>
        </Switch>
        {/* </AddPostContext.Provider> */}
      </UserContext.Provider>

    </Router >
  );
}

export default App;

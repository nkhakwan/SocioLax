import React, { useState, useContext } from "react";
import firebase from "firebase/app";
import { message, Button, Modal } from 'antd';
import { isLoaded } from 'react-redux-firebase'
import { Link } from "react-router-dom";
import { useFirestore } from 'react-redux-firebase';
import { UserContext } from './userContext';

///////////////////
///////////////////

export default function SignIn() {
  const firestore = useFirestore()
  const auth = firebase.auth()
  console.log("i am in signin main");


  const [signupVisible, setSignupVisible] = useState(false)
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("")

  const [signinVisible, setSigninVisible] = useState(false)
  const [signinEmail, setSigninEmail] = useState("")
  const [signinPassword, setSigninPassword] = useState("")
  const [role, setrole] = useState("Role1")
  const [toggleToSignIn, setToggleToSignIn] = useState(false);

  //======================
  const { value, setValue } = useContext(UserContext);
  //const { addPost, setAddPost } = useContext(AddPostContext);
  

  function doSignUp() {
    console.log("i am in signup");
    if (signupPassword === signupConfirmPassword) {
      firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPassword).then(function (data) {
        console.log("do i get anything here=>>> ", data.user.uid)

        message.success("successfully signed up!");
        console.log("doSignUp auth user: ", auth.currentUser);
        setSignupVisible(false)
        setToggleToSignIn(true);
        return firestore.collection('users').add({ userId: data.user.uid, role, liked: [] })
      }).catch(function (error) {
        message.error(error.message);
      });
    } else {
      message.error("Passwords do not match");
    }
  }

  ////////////////////
  ////////////////////

  function doSignIn() {
    console.log("i am in simple signin");
    if(!auth.currentUser){
      firebase.auth().signInWithEmailAndPassword(signinEmail, signinPassword).then(function () {
        message.success("Successfully signed in!");
        setSigninVisible(false)
        setToggleToSignIn(true);
        console.log(value);
        console.log("doSignIn auth: ", auth.currentUser);
        console.log(auth)
      }).catch(function (error) {
        message.error(error.message);
      });
    } else {
      console.log("ALREADY LOGGED IN");
    }
  }

  

  ////////////////////
  ///////////////////

  function doSignOut() {
    console.log("i am in signout");
    firebase.auth().signOut().then(function () {
      message.success("Successfully signed out!");
      setToggleToSignIn(false);
      console.log (`DOSIGNOUT: Here is value ${value} and currentUser ${auth.currentUser} and togglething ${toggleToSignIn}`);

    }).catch(function (error) {
      message.error(error.message);
    });
  }

  ///////////////////
  ///////////////////


    console.log(` here is the current user ${auth.currentUser} and value ${value} and toggle thing ${toggleToSignIn}`);
  if ((auth.currentUser == null) && (!toggleToSignIn)) {
    console.log("i am in signin and signUP");
    //console.log(`${isLoaded(auth)} and ${auth.currentUser}`);
    return (
      <nav className="header">
        <Button type="primary" onClick={() => setSignupVisible(true)}> Sign Up</Button>
        <Modal title="Sign up" visible={signupVisible} onOk={doSignUp} onCancel={() => setSignupVisible(false)}>
          <h1>Sign up</h1>
          <form >
            <input onChange={e => setSignupEmail(e.target.value)} type='text' name='email' placeholder='Email' />
            <input onChange={e => setSignupPassword(e.target.value)} type='password' name='password' placeholder='Password' />
            <input onChange={e => setSignupConfirmPassword(e.target.value)} type='password' name='confirmPassword' placeholder='Confirm Password' />
            <select onChange={e => setrole(e.target.value)} name="role" id="cars">
              <option value="Role1">Role1</option>
              <option value="Role2">Role2</option>
            </select>

          </form>
        </Modal>
        <h3> Please SignIn/SignUp if you want to Post your comments</h3>
        <Button type="primary" onClick={() => setSigninVisible(true)}> Sign In</Button>
        <Modal title="Sign in" visible={signinVisible} onOk={doSignIn} onCancel={() => setSigninVisible(false)}>
          <h1>Sign In</h1>
          <form >
            <input onChange={e => setSigninEmail(e.target.value)} type='text' name='email' placeholder='Email' />
            <input onChange={e => setSigninPassword(e.target.value)} type='password' name='password' placeholder='Password' />
          </form>
        </Modal>
      </nav>
    )
  } else {
    return (
      <nav className="header">
        <Link to="/">See all Posts</Link>
        <Link to="/PostsList">See My Posts Only</Link>
        <Link to="/NewPostForm">Add a comment</Link>
        <Link to="/AllUsers">Show Me All Users</Link>
        <Button onClick={doSignOut}>Sign out</Button>
      </nav>
    )
  }
  console.log(auth.currentUser);
}






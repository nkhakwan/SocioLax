import React, { useState } from "react";
import firebase from "firebase/app";
import { message, Button, Modal } from 'antd';
import { isLoaded } from 'react-redux-firebase'
import { Link } from "react-router-dom";
import { useFirestore } from 'react-redux-firebase'


///////////////////
///////////////////

export default function SignIn() {
  console.log("i am in signin main");


  const [signupVisible, setSignupVisible] = useState(false)
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("")

  const [signinVisible, setSigninVisible] = useState(false)
  const [signinEmail, setSigninEmail] = useState("")
  const [signinPassword, setSigninPassword] = useState("")
  const [role, setrole] = useState("Role1")

  //////////////////////////////
  /////////////////////////////

  const firestore = useFirestore()
  const auth = firebase.auth()

//////////////////////
//////////////////////

  function doSignUp() {
    console.log("i am in signup");
    if (signupPassword === signupConfirmPassword) {
      firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPassword).then(function (data) {
        console.log("do i get anything here=>>> ", data.user.uid)

        message.success("successfully signed up!");
        setSignupVisible(false)
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
    console.log ("i am in simple signin");
    firebase.auth().signInWithEmailAndPassword(signinEmail, signinPassword).then(function () {
      message.success("Successfully signed in!");
      setSigninVisible(false)
      console.log(auth.currentUser)
    }).catch(function (error) {
      message.error(error.message);
    });
  }

  ////////////////////
  ///////////////////

  function doSignOut() {
    console.log("i am in signout");
    firebase.auth().signOut().then(function () {
      message.success("Successfully signed out!");

    }).catch(function (error) {
      message.error(error.message);
    });
  }

  ///////////////////
  ///////////////////



  if ((isLoaded(auth)) && (auth.currentUser == null)) {
    return (
      <nav className="header">
        <Link to="/">See All Posts</Link>
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
        <Link to="/SocioLax">Show My Posts only</Link>
        <Button onClick={doSignOut}>Sign out</Button>
        {/* <Button onClick={doSignIn}>Sign In</Button> */}
        {/* <Button onClick={doSignUp}>Sign up</Button> */}
      </nav>
    )
  }
}
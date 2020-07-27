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
  console.log("i am in signin main");


  const [signupVisible, setSignupVisible] = useState(false)
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("")

  const [signinVisible, setSigninVisible] = useState(false)
  const [signinEmail, setSigninEmail] = useState("")
  const [signinPassword, setSigninPassword] = useState("")
  const [role, setrole] = useState("Role1")
  const { value, setValue } = useContext(UserContext);

  //////////////////////////////
  /////////////////////////////
  const [toggleToSignIn, setToggleToSignIn] = useState(false);

  ///////////////////////
  ///////////////////////

  const firestore = useFirestore()
  const auth = firebase.auth()
  console.log(`${isLoaded(auth)} and ${auth.currentUser}`);

  //////////////////////
  //////////////////////

  function doSignUp() {
    console.log("i am in signup");
    if (signupPassword === signupConfirmPassword) {
      firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPassword).then(function (data) {
        console.log("do i get anything here=>>> ", data.user.uid)

        message.success("successfully signed up!");
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
    firebase.auth().signInWithEmailAndPassword(signinEmail, signinPassword).then(function () {
      message.success("Successfully signed in!");
      setSigninVisible(false)
      setToggleToSignIn(true);
      setValue(auth.currentUser);
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
      setToggleToSignIn(false);
      setValue(null);
    }).catch(function (error) {
      message.error(error.message);
    });
  }

  ///////////////////
  ///////////////////



  if ((value == null) && (auth.currentUser == null) && (!toggleToSignIn)) {
    console.log(`${isLoaded(auth)} and ${auth.currentUser}`);
    return (
      <nav className="header">
        {/* <Link to="/">See All Posts</Link> */}
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
        <h3> Please SignIn if you want to Post your comments</h3>
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
        <Link to="/SocioLax">HOME</Link>
        <Button onClick={doSignOut}>Sign out</Button>
      </nav>
    )
  }
}




////////////
///////////
/////////////
///new file////

import React, { useState, useEffect, useContext } from 'react'
import { isLoaded } from 'react-redux-firebase';
import firebase from 'firebase/app'
import PostsList from './PostsList'
import NewPostForm from './NewPostForm';
import { message, Button, Modal } from 'antd';
import { Link } from "react-router-dom";
import { useFirestore } from 'react-redux-firebase'
import { UserContext } from '../userContext'


export default function TheController() {
  const [form, setform] = useState(false);
  const [reRender, setReRender] = useState('');
  const { value, setValue } = useContext(UserContext);
  console.log(reRender);


  const firestore = useFirestore()
  const auth = firebase.auth();

  useEffect(() => {
    setReRender(auth.currentUser)
  }, [value])


  if (!isLoaded(auth)) {
    return (
      <React.Fragment>
        <h1>Loading...</h1>
      </React.Fragment>
    )
  }
  // if ((isLoaded(auth)) && (auth.currentUser == null)) {
  if ((value == null)) {
    // if ((value == null) && (reRender == null)) {
    //console.log(auth.currentUser);
    console.log(isLoaded(auth));
    console.log(reRender);

    return (
      <React.Fragment>
        <h1>You must be signed in to see your profile</h1>
      </React.Fragment>
    )
  }
  // if ((isLoaded(auth)) && (auth.currentUser != null)) {
  if ((value)) {
    // if ((value) && (reRender != null)) {
    //console.log(auth.currentUser)
    console.log(reRender);
    return (
      <div>
        <h1>Your Posts</h1>
        {/* {!form ? <PostsList currentUser={auth.currentUser} /> : <NewPostForm auth={auth} setform={setform} />} */}
        {<NewPostForm auth={auth} setform={setform} />}
        <button onClick={() => setform(true)}>Add Post</button>
      </div >
    )
  }
}



//////////////////////////
//////////////////////////
/// Monday Moring controller

import React, { useState, useEffect, useContext } from 'react'
import { isLoaded } from 'react-redux-firebase';
import firebase from 'firebase/app'
import PostsList from './PostsList'
import NewPostForm from './NewPostForm';
import { message, Button, Modal } from 'antd';
import { Link } from "react-router-dom";
import { useFirestore } from 'react-redux-firebase'
import { UserContext, AddPostContext } from '../userContext'


export default function TheController() {

  //======================
  //======================
  const [form, setform] = useState(false);
  //const [myPosts, setMyPosts] = useState(false);
  // [seeAllPosts, setSeeAllPosts] = useState(false);
  //======================
  //======================  
  const { value, setValue } = useContext(UserContext);
 // const { addPost, setAddPost } = useContext(AddPostContext);
  //==========================
  //==========================

  const firestore = useFirestore()
  const auth = firebase.auth();

  //============================
  //============================

  // useEffect(() => {
  //   console.log(addPost)
  // }, [addPost]
  // )



  if (!isLoaded(auth)) {
    return (
      <React.Fragment>
        <h1>Loading...</h1>
      </React.Fragment>
    )
  }

  // ==================
  // ==================
  if ((value == null)) {
    console.log(isLoaded(auth));

    return (
      <React.Fragment>
        <h1>You must be signed in to see your profile</h1>
      </React.Fragment>
    )
  }

  //===================
  //===================
  let currentlyVisibleState = null;
  if ((value)) {
    console.log(value);
    //console.log(addPost);
   // if (addPost) {
      currentlyVisibleState = <NewPostForm auth={auth} />
    }
    // } else if (MyPosts) {
    // currentlyVisibleState = <NewKeg onNewKegCreation={this.onNewKegCreation} />
    // } else if (seeAllPosts) {
    // currentlyVisibleState = <KegList kegList={this.state.masterKegList} buy={this.buy} detail={this.detail} />;
    // }
    return (
      <React.Fragment>
        {currentlyVisibleState}
      </React.Fragment>
    );
    //}
    // Final One
  }



  /// All garbage below.

//     return (
//       <div>
//         <h1>Your Posts</h1>
//         {/* {!form ? <PostsList currentUser={auth.currentUser} /> : <NewPostForm auth={auth} setform={setform} />} */}
//         {<NewPostForm auth={auth} setform={setform} />}

//       </div >
//     )
//   }

//   // final One;
// }



// render() {

//   <button onClick={() => setAddPost(true)}>Add a Post</button>
//   <button onClick={() => setMyPosts(true)}>See my Posts only</button>
//   <button onClick={() => setSeeAllPosts(true)}>See all Posts</button>

//   let currentlyVisibleState = null;
//   let buttonText = null;
//   if (AddPost){
//     currentlyVisibleState = <Details detailItem={this.state.detailItem[0]} back={this.back } />;
//   } else if (MyPosts) {
//     currentlyVisibleState = <NewKeg onNewKegCreation={this.onNewKegCreation} />
//   } else if (seeAllPosts) {
//     currentlyVisibleState = <KegList kegList={this.state.masterKegList} buy={this.buy} detail={this.detail} />;
//   }
//   return (
//     <React.Fragment>
//       {currentlyVisibleState}
//     </React.Fragment>
//   );
// }


//////
/////
/////
// Monday Morning Sign in

import React, { useState, useContext } from "react";
import firebase from "firebase/app";
import { message, Button, Modal } from 'antd';
import { isLoaded } from 'react-redux-firebase'
import { Link } from "react-router-dom";
import { useFirestore } from 'react-redux-firebase';
import { UserContext, AddPostContext } from './userContext';

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
  const [toggleToSignIn, setToggleToSignIn] = useState(false);

  //======================
  const { value, setValue } = useContext(UserContext);
  //const { addPost, setAddPost } = useContext(AddPostContext);
  // ==============================

  //////////////////////////////
  /////////////////////////////
  //const [toggleToSignIn, setToggleToSignIn] = useState(false);

  ///////////////////////
  ///////////////////////

  const firestore = useFirestore()
  const auth = firebase.auth()
  console.log(`${isLoaded(auth)} and ${auth.currentUser}`);

  //////////////////////
  //////////////////////

  function doSignUp() {
    console.log("i am in signup");
    if (signupPassword === signupConfirmPassword) {
      firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPassword).then(function (data) {
        console.log("do i get anything here=>>> ", data.user.uid)

        message.success("successfully signed up!");
        setValue(auth.currentUser);
        setSignupVisible(false)
        setToggleToSignIn(true);
        //setToggleToSignIn(true);
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
    firebase.auth().signInWithEmailAndPassword(signinEmail, signinPassword).then(function () {
      message.success("Successfully signed in!");
      setSigninVisible(false)
      setToggleToSignIn(true);
      setValue(auth.currentUser);
      console.log(value);
      console.log(auth.currentUser)
    }).catch(function (error) {
      message.error(error.message);
    });
  }

  // function doAddPost() {
  //   console.log(addPost)
  //   setAddPost(true);
  //   console.log(addPost)
  // }




  ////////////////////
  ///////////////////

  function doSignOut() {
    console.log("i am in signout");
    firebase.auth().signOut().then(function () {
      message.success("Successfully signed out!");
      setToggleToSignIn(false);
      setValue(null);

    }).catch(function (error) {
      message.error(error.message);
    });
  }

  ///////////////////
  ///////////////////



  //if ((value == null) && (auth.currentUser == null)) {
  if ((value == null) && (auth.currentUser == null) && (!toggleToSignIn)) {
    console.log(`${isLoaded(auth)} and ${auth.currentUser}`);
    return (
      <nav className="header">
        {/* <Link to="/">See All Posts</Link> */}
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
        <Link to="/SocioLax">HOME</Link>
        {/* <button onClick={() => doAddPost()}>Add Post</button> */}

        <Button onClick={doSignOut}>Sign out</Button>
      </nav>
    )
  }
}


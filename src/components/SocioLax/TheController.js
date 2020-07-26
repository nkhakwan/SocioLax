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
  const { value, setValue } = useContext(UserContext);


  const firestore = useFirestore()
  const auth = firebase.auth();



  if (!isLoaded(auth)) {
    return (
      <React.Fragment>
        <h1>Loading...</h1>
      </React.Fragment>
    )
  }
  if ((value == null)) {
    console.log(isLoaded(auth));

    return (
      <React.Fragment>
        <h1>You must be signed in to see your profile</h1>
      </React.Fragment>
    )
  }
  if ((value)) {
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

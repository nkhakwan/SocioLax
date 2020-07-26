import React, { useState } from 'react'
import { isLoaded } from 'react-redux-firebase';
import firebase from 'firebase/app'
import PostsList from './PostsList'
import NewPostForm from './NewPostForm';

export default function TheController() {
  const [form, setform] = useState(true);


  const auth = firebase.auth();
  if (!isLoaded(auth)) {
    return (
      <React.Fragment>
        <h1>Loading...</h1>
      </React.Fragment>
    )
  }
  if ((isLoaded(auth)) && (auth.currentUser == null)) {
    console.log(auth.currentUser);
    console.log(isLoaded(auth));

    return (
      <React.Fragment>
        <h1>You must be signed in to see your profile</h1>
      </React.Fragment>
    )
  }
  if ((isLoaded(auth)) && (auth.currentUser != null)) {
    console.log(auth.currentUser)
    return (
      <div>
        <h1>Your Posts</h1>
        {!form ? <PostsList currentUser={auth.currentUser} /> : <NewPostForm auth={auth} setform={setform} />}
        <button onClick={() => setform(true)}>Add Post</button>
      </div >
    )
  }
}

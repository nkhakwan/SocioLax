import React, { useState, useEffect, useContext } from 'react'
import { isLoaded } from 'react-redux-firebase';
import firebase from 'firebase/app'
import { message, Button, Modal } from 'antd';
import { Link, Redirect } from "react-router-dom";
import { useFirestore } from 'react-redux-firebase'
import PostsList from './PostsList';

export default function NewPostForm(props) {
  //const { auth } = props
  const auth = firebase.auth();
  //console.log("i am in newForm");

  const firestore = useFirestore();
  const [name, setname] = useState('');
  const [url, seturl] = useState('');
  const [desc, setdesc] = useState('');
  const [redirect, setRedirect] = useState(false);

  const addProject = () => {
    message.success("Post Added Succesfully!")
    setRedirect(true);
    return firestore.collection('postings').add({ name, url, desc, userId: auth.currentUser.uid, userEmail: auth.currentUser.email, likes: 0, usersLiked: [] })
  }

  return (
    <React.Fragment>
    {redirect ?<Redirect to="/" /> : 
    <div class = "new-form">
      <form >
        <input class="nf-inputs" onChange={e => setname(e.target.value)} type="text" placeholder=" Post Title" />
        <input class="nf-inputs" onChange={e => seturl(e.target.value)} type="url" placeholder="add link to your image" />
        <textarea class="nf-inputs" onChange={e => setdesc(e.target.value)} cols="50" rows="10" placeholder="Add your comments" />
        <button onClick={addProject} >Post!</button>
      </form>
    </div>}
    </React.Fragment>
  )
}




import React, { useState, useEffect, useContext } from 'react'
import { isLoaded } from 'react-redux-firebase';
import firebase from 'firebase/app'
import { message, Button, Modal } from 'antd';
import { Link } from "react-router-dom";
import { useFirestore } from 'react-redux-firebase'

export default function NewPostForm(props) {
  //const { auth } = props
  const auth = firebase.auth();
  console.log("i am in newForm");

  const firestore = useFirestore();
  const [name, setname] = useState('');
  const [url, seturl] = useState('');
  const [desc, setdesc] = useState('');

  const addProject = () => {
   // addPost(false)
    message.success("Post Added Succesfully!")
    return firestore.collection('postings').add({ name, url, desc, userId: auth.currentUser.uid, userEmail: auth.currentUser.email, likes: 0, usersLiked: [] })
  }

  return (
    <div>
      <form >
        <input onChange={e => setname(e.target.value)} type="text" placeholder=" Post Title" />
        <input onChange={e => seturl(e.target.value)} type="url" placeholder="Your Sign" />
        <textarea onChange={e => setdesc(e.target.value)} cols="50" rows="10" placeholder="describe your project and tech used" />
        <button onClick={addProject} >Post!</button>
      </form>
    </div>
  )
}
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import PostNote from "../SocioLax/PostNote";
import React, { useState } from "react";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import { useFirestore } from 'react-redux-firebase';




export default function Landing() {
  const firestore = useFirestore();
  const auth = firebase.auth();
  useFirestoreConnect([{ collection: 'postings' }])
  const postings = useSelector(state => state.firestore.ordered.postings)
  if (isLoaded(postings)) {
    console.log(postings);
    //postings.map(posting=> (console.log(posting.id)));
    return (
      <>
          <h1>All Postings</h1>
        <div className="card-container">
          {postings.length === 0 ? <h1>Nothing yet, post what's on your mind!</h1> : postings.map(posting => (<PostNote key={posting.id} posting={posting} />))}
        </div>
      </>
    )

  } else {
    return <h1>Loading</h1>
  }
}
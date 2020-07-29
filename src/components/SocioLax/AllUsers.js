import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import PostNote from "../SocioLax/PostNote";
import React, { useState } from "react";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import { useFirestore } from 'react-redux-firebase';




export default function AllUsers() {
  const firestore = useFirestore();
  const auth = firebase.auth();
  useFirestoreConnect([{ collection: 'postings' }])
  const gettingUsers = useSelector(state => state.firestore.ordered.postings)
  if (isLoaded(gettingUsers)) {
    console.log(gettingUsers);
    let tempEmail =[];
    let uniqueTempEmail = [];
    for (let i= 0; i<gettingUsers.length; i++){
      tempEmail = [...tempEmail, gettingUsers[i].userEmail];
    }
    for (let i= 0; i<tempEmail.length; i++){
      if (!uniqueTempEmail.includes(tempEmail[i])){
        uniqueTempEmail = [...uniqueTempEmail, tempEmail[i]];
      }
    }

    return (
      <>
          <h1>All Users</h1>
        <div>
          {uniqueTempEmail.length === 0 ? 
          <h1>No User yet</h1> : 
          uniqueTempEmail.map(myUsers => (
          <p> email: {myUsers} </p>
          ))}
        </div>
      </>
    )

  } else {
    return <h1>Loading</h1>
  }
}


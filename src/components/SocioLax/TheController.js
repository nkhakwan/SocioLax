import React, { useState, useEffect, useContext } from 'react'
import { isLoaded } from 'react-redux-firebase';
import firebase from 'firebase/app'
import PostsList from './PostsList'
import NewPostForm from './NewPostForm';
import { message, Button, Modal } from 'antd';
import { Link } from "react-router-dom";
import { useFirestore } from 'react-redux-firebase'



export default function TheController() {

  
  const [form, setform] = useState(false);
  

  const firestore = useFirestore()
  const auth = firebase.auth();

  



  if (!isLoaded(auth)) {
    return (
      <React.Fragment>
        <h1>Loading...</h1>
      </React.Fragment>
    )
  }

  
  let currentlyVisibleState = null;
 
    return (
      <React.Fragment>
        {currentlyVisibleState}
      </React.Fragment>
    );
   
  }



 

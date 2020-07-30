
import PostNote from "./PostNote"
import React, { useState, useEffect, useContext } from 'react'
import { isLoaded } from 'react-redux-firebase';
import firebase from 'firebase/app'
import { message, Button, Modal } from 'antd';
import { Link } from "react-router-dom";
import { useFirestore } from 'react-redux-firebase'
import { UserContext, AddPostContext } from '../userContext'

export default function PostsList(props) {
  const { currentUser } = props
  const firestore = useFirestore();
  const [data, setdata] = useState([])

  const auth = firebase.auth();
  
  
  useEffect(() => {

    firestore.collection("postings").where("userId", "==", auth.currentUser.uid).get()
      .then(function (querySnapshot) {
        let temp = [...data];
        querySnapshot.forEach(function (doc) {
          temp = [...temp, { ...doc.data(), id: doc.id }];
        });
        setdata(temp);
      })
      .catch(function (error) {
      });
  }, [])


  if (!isLoaded(auth)) {
    return (
      <React.Fragment>
        <h1>Loading...</h1>
      </React.Fragment>
    )
  } else{
  return (
    <div className="postings-container">
      {data.length === 0 ? <h1>Nothing yet, add some!</h1> : data.map(post => <PostNote key={post.id} posting={post} />)}
    </div>
  )

  }
}
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
  const [data, setData] = useState([]);  // new line
  const [specificUser, setSpecificUser] = useState(false);  // new line


  useFirestoreConnect([{ collection: 'postings' }])
  const gettingUsers = useSelector(state => state.firestore.ordered.postings)


  /////
    ////
    const seeThisUserPosts = (email) => {
      setSpecificUser(true);
      console.log(gettingUsers);
      console.log("I am inside see this user post");
      firestore.collection("postings").where("userEmail", "==", email).get()
        .then(function (querySnapshot) {
          let temp = [...data];
          querySnapshot.forEach(function (doc) {
            temp = [...temp, { ...doc.data(), id: doc.id }];
          });
          setData(temp);
        })
        .catch(function (error) {
        });
  
      }
      ////
      ////


  if (isLoaded(gettingUsers) && !specificUser) {
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
          <h3> Click the User and you'll see all the posts of that user</h3>
          {uniqueTempEmail.length === 0 ? <h1>No User yet</h1> : uniqueTempEmail.map(myUsers => (<button onClick={() => seeThisUserPosts(myUsers)}>{myUsers}</button>))}
        </div>
      </>
    )
  } else if (specificUser){
    //setSpecificUser(false);
    console.log("i am inside specificUser ture");
    console.log(data);
    return (
      <div className="card-container">
        {data.length === 0 ? <h1>Nothing yet, add some!</h1> : data.map(post => <PostNote posting={post} />)}
      </div>
    )

  
  } else  {
    return <h1>Loading</h1>
  }
}


import React, { useEffect, useState, useContext } from 'react'
import firebase from 'firebase/app'
import { useFirestore } from 'react-redux-firebase';
import EditPostForm from './EditPostForm'
import { UserContext } from '../userContext';
import { Link, Redirect } from "react-router-dom";
import { message, Button, Modal } from 'antd';




export default function PostNote(props) {
  const { posting } = props
  const firestore = useFirestore();
  const [user, setUser] = useState(null);
  const [dRedirect, setDRedirect] = useState(false);
  ////
  const [myEdit, setMyEdit] = useState(false);
  const { value, setValue } = useContext(UserContext);
  ////
  const auth = firebase.auth()

  useEffect(() => {
    setUser(auth.currentUser)
  }, [auth])

  ////
  ////
  ////
  const like = (id, userId) => {
    if (!posting.usersLiked.includes(userId)) {
      //console.log(id);
           return firestore.update({ collection: 'postings', doc: id }, { likes: posting.likes + 1, usersLiked: [...posting.usersLiked, userId] })
    } else {
      //console.log("already liked");

    }
    //console.log("proj id =>", id, "user id =>", userId)
  }
  /////
  /////
  /////


  const deletePost = (id, userId) => {
    if (posting.userId == userId) {
      setDRedirect(true);
      //console.log(id);
      return firestore.delete({ collection: 'postings', doc: id })
    } else {

    }
  }


 
//////////
/////////
  const Edit = (myData) => {
  console.log (`owner is ${posting.userId} post.id is ${posting.id} and userId is ${user.uid}`);
  //setValue(false);
  if (posting.userId == user.uid){
  message.success("Post updated Succesfully!")
  setDRedirect(true);
  setMyEdit(false);
  return firestore.update({ collection: 'postings', doc: posting.id }, { desc: myData.desc  , url: myData.url, name: myData.name})
  } else {
    console.log("you are not the owner of this post");
  }
  setMyEdit(false);
}
//////
//////


if (!myEdit){
  //console.log("i am in value false");
  console.log(user);
  return (
    <React.Fragment>
    {dRedirect ?<Redirect to="/" /> : 
    //<div key={posting.userId} className='pc'>
    
    <div  className='pc'>
      <h2>{posting.name}</h2>
      <h3>By {posting.userEmail}</h3>
      <p>{posting.desc}</p>
      <h4>Likes: {posting.likes}</h4>
      {console.log(" in the first edit button inside postnote")}
      {user != null ? <button onClick={() => like(posting.id, user.uid)}>Like</button> : ''}
      {user == null ? '' : user.uid == posting.userId ? <button onClick={() => deletePost(posting.id, user.uid)}>Delete</button> : ''} 
      {/* {user == null ? '' : user.uid == posting.userId ? <button onClick={() => EditPost()}>Edit</button> : ''}  */}
      {/* {user == null ? '' :user.uid == posting.userId ?<button onClick={() =><EditPostForm Edit={Edit} />}>Edit</button>: ''} */}
      {user == null ? '' :user.uid == posting.userId ?<button onClick={()=>(setMyEdit(true))}>Edit</button>: ''}
      <a href={posting.url}>See it</a>
    </div>
}
</React.Fragment>
  )
} else if(myEdit){
  console.log("I am in value ture");
   return(
    <EditPostForm Edit={Edit}/>
   )
   
}
}



import React, { useEffect, useState, useContext } from 'react'
import firebase from 'firebase/app'
import { useFirestore } from 'react-redux-firebase';
import EditPostForm from './EditPostForm'
import { UserContext } from '../userContext';
import { Link, Redirect } from "react-router-dom";




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
  /*const Edit = (myData) => {
  console.log (`owner is ${owner} post.id is ${id} and userId is ${userId}`);
  //setValue(false);
  if (userId == owner){
  message.success("Post updated Succesfully!")
  return firestore.update({ collection: 'postings', doc: posting.id }, { desc: desc  , url:url, name: name})
  } else {
    console.log("you are not the owner of this post");
  }
  setMyEdit(false);
}*/
//////
//////


if (!myEdit){
  console.log("i am in value false");
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
      {user != null ? <button onClick={() => like(posting.id, user.uid)}>Like</button> : ''}
      {/* {user != null ? <button onClick={() => deletePost(posting.id, user.uid)}>You can delete only your post here</button> : ''} */}
      {/* {user != null ? <button onClick={() => setMyEdit(true)}>You can edit only your own post here</button> : ''} */}
       {user == null ? '' : user.uid == posting.userId ? <button onClick={() => deletePost(posting.id, user.uid)}>Delete</button> : ''} 
       {user == null ? '' :user.uid == posting.userId ?<button onClick={() => setMyEdit(true)}>Edit</button> : ''}
      <a href={posting.url}>See it</a>
    </div>
}
</React.Fragment>
  )
} else if(myEdit){
  console.log("I am in value ture");
  //setMyEdit(false);
   return(
    <EditPostForm EditdocId={posting.id} userId={user.uid} owner={posting.userId}/>
   )
   
}
}



import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import { useFirestore } from 'react-redux-firebase';
import EditPostForm from './EditPostForm'


export default function PostNote(props) {
  const { posting } = props
  const firestore = useFirestore();
  const [user, setUser] = useState(null);
  ////
  const [myEdit, setMyEdit] = useState(false);
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
      //console.log(id);
      return firestore.delete({ collection: 'postings', doc: id })
    } else {
      //console.log("either you are not the owner of this doc or the doc didn't exist");

    }
    //console.log("proj id =>", id, "user id =>", userId)
  }
//////////
/////////
  

if (!myEdit){
  return (
    //<div key={posting.userId} className='pc'>
    <div  className='pc'>
      <h2>{posting.name}</h2>
      <h3>By {posting.userEmail}</h3>
      <p>{posting.desc}</p>
      <h4>Likes: {posting.likes}</h4>
      {user != null ? <button onClick={() => like(posting.id, user.uid)}>Like</button> : ''}
      {user != null ? <button onClick={() => deletePost(posting.id, user.uid)}>You can delete only your post here</button> : ''}
      {user != null ? <button onClick={() => setMyEdit(true)}>You can edit only your own post here</button> : ''}
      <a href={posting.url}>See it</a>
    </div>
  )
} else if(myEdit){
  //setMyEdit(false);
   return(
    <EditPostForm docId={posting.id} userId={user.uid} owner={posting.userId}/>
   )

}
}

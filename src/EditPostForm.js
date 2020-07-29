import React, { useState, useEffect, useContext } from 'react'
import { isLoaded } from 'react-redux-firebase';
import firebase from 'firebase/app'
import { message, Button, Modal } from 'antd';
import { Link } from "react-router-dom";
import { useFirestore } from 'react-redux-firebase'
import { UserContext } from '../userContext';





export default function EditPostForm(props) {
  const { Edit } = props
  const auth = firebase.auth();
  console.log("i am in editForm");

  const firestore = useFirestore();
  const [name, setname] = useState('');
  const [url, seturl] = useState('');
  const [desc, setdesc] = useState('');
  const { value, setValue } = useContext(UserContext);

  
   /* function upDatePosting(event) {
      event.preventDefault();
      props.Edit(
        {
          name: name,
          desc: desc,
          url: url
        });
    }*/

 /* const upDatePosting = (id, userId, owner) => {
    console.log (`owner is ${owner} post.id is ${id} and userId is ${userId}`);
    //setValue(false);
    if (userId == owner){
    message.success("Post updated Succesfully!")
    return firestore.update({ collection: 'postings', doc: id }, { desc: desc  , url:url, name: name})
    } else {
      console.log("you are not the owner of this post");
    }
    setMyEdit(false);
  }*/

 return (
    <div>
      <form >
        <input onChange={e => setname(e.target.value)} type="text" placeholder=" Post Title" />
        <input onChange={e => seturl(e.target.value)} type="url" placeholder="Your Sign" />
        <textarea onChange={e => setdesc(e.target.value)} cols="50" rows="10" placeholder="describe your project and tech used" />
        {/* <Button onClick={upDatePosting(docId, userId, owner)} >Update!</Button> */}
         {/* <Button onSubmit={upDatePosting} >Update!</Button> */}
      </form>
    </div>
  )
}



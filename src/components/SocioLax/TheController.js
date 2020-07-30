import React, { useState, useEffect, useContext } from 'react'
import { isLoaded } from 'react-redux-firebase';
import firebase from 'firebase/app'
import PostsList from './PostsList'
import NewPostForm from './NewPostForm';
import { message, Button, Modal } from 'antd';
import { Link } from "react-router-dom";
import { useFirestore } from 'react-redux-firebase'



export default function TheController() {

  //======================
  //======================
  const [form, setform] = useState(false);
  //const [myPosts, setMyPosts] = useState(false);
  // [seeAllPosts, setSeeAllPosts] = useState(false);
  //======================
  //======================  
 // import { UserContext } from '../userContext'
  //const { value, setValue } = useContext(UserContext);

 // const { addPost, setAddPost } = useContext(AddPostContext);
  //==========================
  //==========================

  const firestore = useFirestore()
  const auth = firebase.auth();

  //============================
  //============================

  // useEffect(() => {
  //   console.log(addPost)
  // }, [addPost]
  // )



  if (!isLoaded(auth)) {
    return (
      <React.Fragment>
        <h1>Loading...</h1>
      </React.Fragment>
    )
  }

  // ==================
  // ==================
  // if ((value == null)) {
  //   //console.log(isLoaded(auth));

  //   return (
  //     <React.Fragment>
  //       <h1>You must be signed in to see your profile</h1>
  //     </React.Fragment>
  //   )
  // }

  //===================
  //===================
  let currentlyVisibleState = null;
  // if ((value)) {
  //  // console.log(value);
  //   //console.log(addPost);
  //  // if (addPost) {
  //     //currentlyVisibleState = <NewPostForm auth={auth} />
  //     currentlyVisibleState =  <PostsList currentUser={auth.currentUser} />
  //   }
    
    return (
      <React.Fragment>
        {currentlyVisibleState}
      </React.Fragment>
    );
    //}
    // Final One
  }



  /// All garbage below.

//     return (
//       <div>
//         <h1>Your Posts</h1>
//         {/* {!form ? <PostsList currentUser={auth.currentUser} /> : <NewPostForm auth={auth} setform={setform} />} */}
//         {<NewPostForm auth={auth} setform={setform} />}

//       </div >
//     )
//   }

//   // final One;
// }



// render() {

//   <button onClick={() => setAddPost(true)}>Add a Post</button>
//   <button onClick={() => setMyPosts(true)}>See my Posts only</button>
//   <button onClick={() => setSeeAllPosts(true)}>See all Posts</button>

//   let currentlyVisibleState = null;
//   let buttonText = null;
//   if (AddPost){
//     currentlyVisibleState = <Details detailItem={this.state.detailItem[0]} back={this.back } />;
//   } else if (MyPosts) {
//     currentlyVisibleState = <NewKeg onNewKegCreation={this.onNewKegCreation} />
//   } else if (seeAllPosts) {
//     currentlyVisibleState = <KegList kegList={this.state.masterKegList} buy={this.buy} detail={this.detail} />;
//   }
//   return (
//     <React.Fragment>
//       {currentlyVisibleState}
//     </React.Fragment>
//   );
// }

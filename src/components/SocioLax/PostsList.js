import React, { useState, useEffect } from 'react'
import PostNote from "../PostNote"
import { useFirestore } from 'react-redux-firebase'

export default function PostsList(props) {
  const { currentUser } = props
  const firestore = useFirestore();
  const [data, setdata] = useState([])

  useEffect(() => {

    firestore.collection("postings").where("userId", "==", currentUser.uid).get()
      .then(function (querySnapshot) {
        let temp = [...data];
        querySnapshot.forEach(function (doc) {
          temp = [...temp, { ...doc.data(), id: doc.id }];
          console.log(doc.id, '==>', doc.data());
        });
        setdata(temp);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }, [])


  return (
    <div className="card-container">
      {data.length === 0 ? <h1>Nothing yet add some!</h1> : data.map(post => <PostNote key={post.id} post={post} />)}

    </div>
  )


}
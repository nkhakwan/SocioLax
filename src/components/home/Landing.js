import React from 'react'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import PostNote from "../PostNote";
export default function Landing() {
  useFirestoreConnect([{ collection: 'postings' }])
  const postings = useSelector(state => state.firestore.ordered.postings)
  if (isLoaded(postings)) {
    console.log(postings)
    return (
      <>
        <h1>All Projects</h1>
        <div className="card-container">

          {postings.length === 0 ? <h1>Nothing yet, post what's on your mind!</h1> : postings.map(posting => (<PostNote key={posting.id} posting={posting} />))}
        </div>
      </>
    )

  } else {
    return <h1>Loading</h1>
  }
}
import React, { useState } from 'react'
import { database } from './firebaseInitialize'
import { ref, push, update } from 'firebase/database'

const CreateTweet = ({ user }) => {
    const [tweetContent, setTweetContent] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (tweetContent.length <= 200 && tweetContent.length > 0){
            const newTweetRef = push(ref(database, 'tweets'))
            const newTweetKey = newTweetRef.key
            const updates = {}
            updates['/tweets/' + newTweetKey] = {
                content: tweetContent,
                author: user.uid,
                likes: 0,
                comments: []
            }
            update(ref(database, `users/${user.uid}/tweets`), updates)
        }
        setTweetContent('')
    }


  return (
    <form onSubmit={handleSubmit}>
      <input type="text" size={200} value={tweetContent} onChange={(e) => setTweetContent(e.target.value)}/>
      <p className='instruction'>{200 - tweetContent.length} characters remaining.</p>
      <button type='submit'>Submit Tweet</button>
    </form>
  )
}

export default CreateTweet

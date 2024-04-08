import React, { useState } from 'react'
import { database } from '../firebaseInitialize'
import { ref, update, serverTimestamp, push, get } from 'firebase/database'
import '../styles/createtweet.css'

const CreateTweet = ({ userId }) => {
    const [tweetContent, setTweetContent] = useState('')

    const getDisplayName = async () => {
      const displayNameRef = ref(database, `users/${userId}/displayName`)
      try {
        const snapshot = await get(displayNameRef)
        console.log('shot', snapshot)
        if (snapshot.exists()){
          const currentDisplayName = snapshot.val()
          return(currentDisplayName)
        }
      } catch {
        (error) => console.error(error)
        return ''
      }
      
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (tweetContent.length <= 200 && tweetContent.length > 0){
          try {
            const displayName = await getDisplayName()
            const newTweetRef = push(ref(database, `users/${userId}/tweets`));
            const newTweetKey = newTweetRef.key;

            const updates = {}
            updates['/tweets/' + newTweetKey] = {
              content: tweetContent,
              author: userId,
              displayName: displayName,
              likes: {},
              timestamp: serverTimestamp(),
              id: newTweetKey
          }
            update(ref(database, `users/${userId}`), updates)
          } catch(error){
            console.error(error)
          }
        }
        else alert('Tweet Must be between 1 and 200 characters')
        setTweetContent('')
    }

  return (
    <form className='create-tweet-form' onSubmit={handleSubmit}>
      <div className="create-tweet-header">
        <h2>Create a tweet:</h2>
      </div>
      <textarea rows={5} cols={35} value={tweetContent} onChange={(e) => setTweetContent(e.target.value)}/>
      <p className='instruction'>{200 - tweetContent.length} characters remaining.</p>
      <button type='submit'>Submit Tweet</button>
    </form>
  )
}

export default CreateTweet

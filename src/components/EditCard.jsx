import React, { useState } from 'react'
import ProfilePicture from './ProfilePicture'
import { ref, update } from 'firebase/database'
import { database } from '../firebaseInitialize'
import '../styles/editcard.css'

const EditCard = ({ tweetContent, userId, displayName, tweetId, updateEditState }) => {
    const [tweetText, setTweetText] = useState(tweetContent)
    const [errorMessage, setErrorMessage] = useState('')

    const handleEditSubmit = (e) => {
        e.preventDefault()
        if (!tweetContent || tweetContent.length <= 0 || tweetContent.length > 200){
            setErrorMessage('Tweet must be between 1 and 200 characters long.')
            return
        }
        const updates = {}
        updates[`users/${userId}/tweets/${tweetId}/content`] = tweetText
        const updateTweet = async () => {
            try {
                await update(ref(database), updates)
                updateEditState(false)
            } catch(error) {
                console.error(error)
            }   
        }
        updateTweet()
    }

    const handleEditCancel = (e) => {
        e.preventDefault()
        updateEditState(false)
    }


  return (
    <div className="edit-card">
        <form onSubmit={handleEditSubmit} className="edit-card-form">
            <div className='edit-card-form-header'>
              <ProfilePicture userId={userId}/>
              <p>{displayName}</p>
            </div>
            <textarea rows={5} cols={35} type='text' size={200} value={tweetText} onChange={(e) => setTweetText(e.target.value)}/>
            <div className="controls">
                <button type='submit'>Submit</button>
                <button onClick={handleEditCancel}>Cancel</button>
            </div>
        </form>
        <p className='error-message'>{errorMessage}</p>
    </div>
  )
}

export default EditCard

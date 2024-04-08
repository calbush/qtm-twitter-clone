import { ref, remove } from 'firebase/database'
import React from 'react'
import { database } from '../firebaseInitialize'

const DeleteButton = ({ tweetId, userId, currentUserId, setTweetExistence}) => {

    const handleDelete = () => {
        if (userId == currentUserId){
            const tweetRef = ref(database, `users/${userId}/tweets/${tweetId}`)
            remove(tweetRef)
                .then(() => {
                    console.log('tweet successfully deleted')
                    setTweetExistence(false)
                }).catch((error) => console.error(error))
            } else console.log("You do not have permission to delete this tweet.")
    }

  return (
    <button onClick={handleDelete}>Delete Tweet</button>
  )
}

export default DeleteButton

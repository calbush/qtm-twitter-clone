import { off, onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { database } from '../firebaseInitialize'

const LikesCounter = ({tweetId, userId}) => {
    const [likesCounter, setLikesCounter] = useState(0)

    useEffect(() => {
        const likesObjRef = ref(database, `users/${userId}/tweets/${tweetId}/likes`)
        const likesCallback = (snapshot) => {
            const likesObj = snapshot.val()
            if (likesObj) {
                let count = Object.keys(likesObj).length
                setLikesCounter(count)
            } else setLikesCounter(0)
        }
        onValue(likesObjRef, likesCallback, (error) => console.error(error))

        return () => {
            off(likesObjRef, likesCallback)
        }
    }, [userId, tweetId])


  return (
    <div className='likes-counter'>
        <p>Likes:</p>
        <p>{likesCounter}</p>
    </div>
  )
}

export default LikesCounter

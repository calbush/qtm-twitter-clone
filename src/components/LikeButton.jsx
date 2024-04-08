import React, { useEffect, useState } from 'react'
import { database } from '../firebaseInitialize'
import { get, ref, update, remove} from 'firebase/database'

const LikeButton = ({ userId, tweetId, currentUserId}) => {
    const [likeStatus, setLikeStatus] = useState(false)

    useEffect(() => {
        const likeStatusRef = ref(database, `users/${currentUserId}/likes/${tweetId}`)
        const getLikeStatus = async () => {
            try {
                const snapshot = await get(likeStatusRef)
                if (snapshot.exists()){
                    setLikeStatus(true)
                }
            } catch {
                console.log("Failed to update like status")
            }
        }
        getLikeStatus()
    }, [tweetId, currentUserId])

    const handleLike = () => {
        const updates = {}
        updates[`users/${userId}/tweets/${tweetId}/likes/${currentUserId}`] = true
        updates[`users/${currentUserId}/likes/${tweetId}`] = true
        const addLike = async () => {
            try {
                await update(ref(database), updates)
                setLikeStatus(true)
            } catch(error){
                console.log(error)
                console.log("Failed to update like status")
            }
        }
        addLike()
    }

    const handleUnlike = () => {
        const userLikeRef = ref(database, `users/${currentUserId}/likes/${tweetId}`)
        const tweetLikeRef = ref(database, `users/${userId}/tweets/${tweetId}/likes/${currentUserId}`)
        const updateLikes = async () => {
            try {
                await remove(userLikeRef)
                await remove(tweetLikeRef)
                setLikeStatus(false)
            } catch {
                console.log("failed to update like status")
            }
        }
        updateLikes()
    }


  return (
    likeStatus ? <button onClick={handleUnlike}>Unlike</button> :
    <button onClick={handleLike}>Like</button>
  )
}

export default LikeButton

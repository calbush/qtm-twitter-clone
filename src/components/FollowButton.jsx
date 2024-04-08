import React, { useEffect, useState } from 'react'
import { ref, get, update, remove } from 'firebase/database'
import { database } from '../firebaseInitialize'
import '../styles/followbutton.css'

const FollowButton = ( { userId, currentUserId }) => {
    const [followStatus, setFollowStatus] = useState(false)

    useEffect(() => {
        const followStatusRef = ref(database, `users/${currentUserId}/following/${userId}`)
        const getFollowStatus = async () => {
            try {
                const snapshot = await get(followStatusRef)
                if (snapshot.exists()){
                    setFollowStatus(true)
                } else {
                    setFollowStatus(false)
                }
            } catch {
                console.log("couldn't fetch follow status")
            }
        }
        getFollowStatus()
    },[userId, currentUserId])

    const handleFollow = () => {
        //we'll need to update both current user's following list and followed users followers list
        const updates = {}
        updates[`users/${currentUserId}/following/${userId}`] = true
        updates[`users/${userId}/followers/${currentUserId}`] = true
        const updateFollowing = async() => {
            try {
               await update(ref(database), updates)
               setFollowStatus(true)
            } catch {
                console.log("failed to successfully update follow status")
            }
        }
        updateFollowing()
        
    }

    const handleUnfollow = () => {
        const followingRef = ref(database, `users/${currentUserId}/following/${userId}`)
        const followerRef = ref(database, `users/${userId}/followers/${currentUserId}`)
        const updateFollowingAndFollowers = async () => {
            try {
                await remove(followingRef)
                await remove(followerRef)
                setFollowStatus(false)
            } catch {
                console.log("failed to successfully update follow status")
            }
        }
        updateFollowingAndFollowers()
    }

    return (
        followStatus ? <button className='unfollow-btn' onClick={handleUnfollow}>Unfollow</button> :
        <button className='follow-btn' onClick={handleFollow}>Follow</button>
    )
}
export default FollowButton

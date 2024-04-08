import React, { useEffect, useState } from 'react'
import ProfilePicture from './ProfilePicture'
import { off, onValue, ref } from 'firebase/database'
import { auth, database } from '../firebaseInitialize'
import FollowButton from './FollowButton'
import { Link } from 'react-router-dom'
import '../styles/miniusercard.css'

const MiniUserCard = ({userId}) => {
    const [displayName, setDisplayName] = useState('')

    const currentUserId = auth.currentUser.uid

    useEffect(() => {
        const displayNameRef = ref(database, `users/${userId}/displayName`)
        const getDisplayNameCallbackonValue = (snapshot) => {
            if (snapshot.exists()){
                const currentUserDisplayName = snapshot.val()
                setDisplayName(currentUserDisplayName)
            }
        }

        onValue(displayNameRef, getDisplayNameCallbackonValue, error => console.error(error))

        return () => {
            off(displayNameRef, getDisplayNameCallbackonValue)
        }
    }, [userId])

  return (
    <div className='mini-user-card'>
      <ProfilePicture userId={userId}/>
      <Link to={`/profile/${userId}`}>
        <p className='display-name'>
            {displayName}
        </p>
      </Link>
      <FollowButton userId={userId} currentUserId={currentUserId}/>
    </div>
  )
}

export default MiniUserCard

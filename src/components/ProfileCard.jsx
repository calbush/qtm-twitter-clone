import { onValue, ref, off } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { auth, database } from '../firebaseInitialize'
import FollowButton from './FollowButton'
import ProfilePicture from './ProfilePicture'

const ProfileCard = ({userId}) => {
    const [userDisplayName, setUserDisplayName] = useState('')
    const [userBio, setUserBio] = useState('')
    const [userWebsite, setUserWebsite] = useState('')
    const [userWebsiteTitle, setUserWebsiteTitle] = useState('')

    const currentUserId = auth.currentUser.uid

    useEffect(() => {
        const userProfileRef = ref(database, `users/${userId}`)
        const getProfileData = (snapshot) => {
            if (snapshot.exists()){
                const profileData = snapshot.val()
                setUserDisplayName(profileData.displayName || '')
                setUserBio(profileData.bio || '')
                setUserWebsite(profileData.websiteLink || '')
                setUserWebsiteTitle(profileData.websiteName || '')
            } else console.log("Couldn't find profile data")
        }
        onValue(userProfileRef, getProfileData, error => console.error(error))

        return () => {
            off(userProfileRef, getProfileData)
        }
    })
  return (
    <div className='profile-card'>
        <ProfilePicture userId={userId}/>
        <p className='display-name'>{userDisplayName}</p>
        <p className="bio">{userBio}</p>
        <a href={userWebsite}>{userWebsiteTitle}</a>
        {currentUserId != userId &&
        <FollowButton userId={userId} currentUserId={currentUserId}/>}
    </div>
  )
}

export default ProfileCard

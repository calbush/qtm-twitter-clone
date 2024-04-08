import React, { useEffect, useState } from 'react'
import { storage, database } from '../firebaseInitialize'
import { getDownloadURL, ref } from 'firebase/storage'
import defaultProfilePicture from '../assets/images/default.png'

const ProfilePicture = ({ userId }) => {
    const [profilePicture, setProfilePicture] = useState(defaultProfilePicture)

    useEffect(() => {
        const getProfilePicture = async () => {
            const profilePicRef = ref(storage, `profile-pictures/${userId}`)
            try{
                const profilePicUrl = await getDownloadURL(profilePicRef)
                setProfilePicture(profilePicUrl)
            } catch {
                console.log("Couldn't find profile picture")
            }
        }
        getProfilePicture()
    },[userId])

  return (
    <img className='profile-picture' src={profilePicture}/>
  )
}

export default ProfilePicture

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { database } from './firebaseInitialize'
import { ref, get } from 'firebase/database'
import CreateTweet from './CreateTweet'
import defaultProfilePic from './assets/images/default.png'

const Profile = ({ user, getProfilePicture }) => {
    const [displayName, setDisplayName] = useState('')
    const [bio, setBio] = useState('')
    const [websiteName, setWebsiteName] = useState('')
    const [websiteLink, setWebsiteLink] = useState('')
    const [profilePicture, setProfilePicture] = useState(defaultProfilePic)

    let { id } = useParams()

    useEffect(() => {
        const fetchProfileInfo = async () => {
            const profileRef = ref(database, `users/${id}`)
            try {
                const snapshot = await get(profileRef)
                if (snapshot.exists()){
                    const profileData = snapshot.val()
                    setDisplayName(profileData.displayName || '')
                    setBio(profileData.bio || '')
                    setWebsiteName(profileData.websiteName || '')
                    setWebsiteLink(profileData.websiteLink || '')
                } else {
                    console.log('no data availible')
                }
                const pictureUrl = await getProfilePicture(user.uid);
                console.log(pictureUrl)
                setProfilePicture(pictureUrl);
            } catch(error){
                console.log('Error fetching profile: ', error)
            }
        }
        fetchProfileInfo()
    },[id, getProfilePicture])

  return (
    <div className='profile-container'>
        <section className="profile-info">
            {profilePicture && <img src={profilePicture} alt="user's profile picture" className='profile-picture'/>}
            <p className="display-name">{displayName}</p>
            <p className="bio">{bio}</p>
            <a href={`http://${websiteLink}`} target='_blank' className="social-media">{websiteName}</a>
        </section>
        <CreateTweet user={user}/>
        <section className="tweets-followers-count"></section>
        <section className="tweets"></section>
    </div>
  )
}

export default Profile

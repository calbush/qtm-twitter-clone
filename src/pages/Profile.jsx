import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { auth, database } from '../firebaseInitialize'
import Feed from '../components/Feed'
import CreateTweet from '../components/CreateTweet'
import { ref, off, onValue } from 'firebase/database'
import ProfileCard from '../components/ProfileCard'

const Profile = () => {
    const [tweetsToRender, setTweetsToRender] = useState([])
    const userId = useParams().id
    const currentUserId = auth.currentUser.uid

    useEffect(() => {
        const tweetsRef = ref(database, `users/${userId}/tweets`)
        const getTweetsCallback = (snapshot) => {
            if (snapshot.exists()){
                const tweetsObj = snapshot.val()
                const tweetsArray = Object.values(tweetsObj)
                setTweetsToRender(tweetsArray)
            }
        }
        onValue(tweetsRef, getTweetsCallback, error => console.error(error))

        return () => {
            off(tweetsRef, getTweetsCallback)
        }
    },[userId])


  return (
    <div className='profile'>
        <ProfileCard userId={userId}/>
        <Feed tweets={tweetsToRender}/>
        {currentUserId == userId && <CreateTweet userId={userId}/>}
    </div>
  )
}

export default Profile

import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { auth, database } from '../firebaseInitialize'
import Feed from '../components/Feed'
import Recommended from '../components/Recommended'

const Home = () => {
    const [followedUsers, setFollowedUsers] = useState([])
    const [tweetsToRender, setTweetsToRender] = useState([])

    const userId = auth.currentUser.uid

    useEffect(() => {
        getFollowedUsers()
    }, [userId])

    useEffect(() => {
        if (followedUsers.length > 0){
            getTweetsOfFollowedUsers()
        }
    }, [followedUsers])

    const getFollowedUsers = () => {
        const followedUsersRef = ref(database, `users/${userId}/following`)
        onValue(followedUsersRef, (snapshot) => {
            if (snapshot.exists()){
                const followedUsersData = snapshot.val()
                const followedUsersArray = Object.keys(followedUsersData)
                setFollowedUsers(followedUsersArray)
            } else console.log('no followed users found')
        })
    }

    const getTweetsOfFollowedUsers = () => {
        const tweetsPromises = followedUsers.map((followedUserId) => {
            return new Promise((resolve, reject) => {
                const tweetsRef = ref(database, `users/${followedUserId}/tweets`)
                onValue(tweetsRef, (snapshot) => {
                    if (snapshot.exists()){
                        const tweetsData = snapshot.val()
                        const tweetsArray = Object.values(tweetsData).sort((a, b) => b.timestamp - a.timestamp)
                        resolve(tweetsArray)
                    } else {
                        resolve([])
                    }
                })
            })
        })
        Promise.all(tweetsPromises)
            .then((tweetsArrays) => {
                const mergedTweets = tweetsArrays.flat().sort((a, b) => b.timestamp - a.timestamp)
                setTweetsToRender(mergedTweets)
            }).catch((error) => console.error(error))
    }

  return (
    <div className='home-page'>
        <Recommended/>
      {followedUsers.length > 0 ? <Feed tweets={tweetsToRender}/>
      : <div>
            <h2>Follow some users and tweets will appear here.</h2>
        </div>}
    </div>
  )
}

export default Home

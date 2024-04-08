import React, { useEffect, useState } from 'react'
import { auth, database } from './firebaseInitialize'
import { ref, get, getDatabase, child, query, orderByKey } from 'firebase/database'
import Tweet from './Tweet'
import Recommended from './Recommended'
import Loading from './Loading'

const Home = ({getProfilePicture}) => {
    const [tweets, setTweets] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [tweetsPerPage] =  useState(6)
    const [loading, setLoading] = useState(true)
    const [followingUsers, setFollowingUsers] = useState([])

    const currentUser = auth.currentUser

    useEffect(() => {
        fetchingFollowingUsers()
    },[])

    useEffect(() => {
        if(followingUsers.length > 0){
            fetchTweets()
        }
    }, [followingUsers, currentPage])


    const fetchingFollowingUsers = async () => {
        try {
            const dbRef = ref(getDatabase());
            const snapshot = await get(child(dbRef, `users/${currentUser.uid}/following`));
            if (snapshot.exists()) {
                const followingData = snapshot.val();
                const followingUsersArray = Object.keys(followingData);
                setFollowingUsers(followingUsersArray);
            } else {
                setFollowingUsers([]);
                console.log("No data available for the user's following list");
            }
        } catch (error) {
            console.error('Error fetching followed users: ', error);
        }
    };

    const fetchTweets = async () => {
        setLoading(true)
        try {
            const tweetsPromises = followingUsers.map(async userId => {
                const tweetsRef = ref(database, `users/${userId}/tweets`);
                const snapshot = await get(tweetsRef);
                return snapshot.val();
            })

            const tweetsData = await Promise.all(tweetsPromises)
            const combinedTweets = tweetsData.reduce((acc, data) => {
                if (data) {
                    acc.push(...Object.values(data))
                }
                return acc
            }, [])
            
            setTweets(combinedTweets)
        } catch (error) {
            console.error('Error fetching tweets:', error)
        }
            setLoading(false)
    }

    const indexOfLastTweet = currentPage * tweetsPerPage;
    const indexOfFirstTweet = indexOfLastTweet - tweetsPerPage;
    const currentTweets = tweets.slice(indexOfFirstTweet, indexOfLastTweet);

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1)
    }

  return (
    <div>
        <Recommended getProfilePicture={getProfilePicture}/>
        {loading ? (
            <Loading/>
        ) : (
            <ul className='tweets-li'>
                {currentTweets.map((tweet, index) => (
                    <li key={index}>
                        <Tweet tweetID={tweet.id} authorID={tweet.author} getProfilePicture={getProfilePicture} />
                    </li>
                ))}
            </ul>
        )}
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={nextPage}>Next</button>
    </div>
  )
}

export default Home

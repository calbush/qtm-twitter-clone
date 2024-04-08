import { onValue, ref, off} from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { auth, database } from '../firebaseInitialize'
import EditCard from './EditCard'
import ProfilePicture from './ProfilePicture'
import DeleteButton from './DeleteButton'
import LikesCounter from './LikesCounter'
import LikeButton from './LikeButton'
import { Link } from 'react-router-dom'
import '../styles/tweetcard.css'

const TweetCard = ({tweetId, userId}) => {
    const [tweetContent, setTweetContent] = useState('')
    const [userDisplayName, setUserDisplayName] = useState('')
    const [timestamp, setTimestamp] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [tweetExistence, setTweetExistence] = useState(true)

    const currentUserId = auth.currentUser.uid

    const updateEditState = (newParentState) => {
        setIsEditing(newParentState)
    }

    const updateTweetExistence = (newExistenceState) => {
        setTweetExistence(newExistenceState)
    }

    useEffect(() => {
        const userDataRef = ref(database, `users/${userId}/tweets/${tweetId}`)
        const tweetCallback = (snapshot) => {
           const tweetData = snapshot.val()
           if (tweetData) {
                setTweetContent(tweetData.content)
                setUserDisplayName(tweetData.displayName)
                const timestampOptions = { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric', 
                    hour: 'numeric', 
                    minute: '2-digit' 
                }
                const timestampDate = new Date(tweetData.timestamp);
                const formattedTimestamp = timestampDate.toLocaleString('en-US', timestampOptions);
                setTimestamp(formattedTimestamp);
            } else console.log("Failed to locate tweet data")
        }
        onValue(userDataRef, tweetCallback, (error) => console.error(error))

        return () => {
            off(userDataRef, tweetCallback)
        }
    },[tweetId, userId])


if (tweetExistence && !isEditing){
    return(
        <div className='tweet-card'>
            <div className='tweet-header'>
                <ProfilePicture userId={userId}/>
                <Link to={`/profile/${userId}`}>
                    <p className='tweet-display-name'>{userDisplayName}</p>
                </Link>
                {currentUserId == userId && 
                <div className='tweet-controls'>
                    <button className='edit-btn' onClick={() => updateEditState(true)}>Edit</button>
                    <DeleteButton tweetId={tweetId} userId={userId} currentUserId={currentUserId} setTweetExistence={updateTweetExistence}/>
                </div>
                }           
            </div>
            <div className='content-timestamp'>
                <p className='tweet-content'>{tweetContent}</p>
                <p className='tweet-timestamp'>{timestamp}</p>
            </div>
            <div className='tweet-footer'>
                <LikesCounter tweetId={tweetId} userId={userId}/>
                <LikeButton tweetId={tweetId} userId={userId} currentUserId={currentUserId}/>
            </div>
        </div>
    )
} else if(tweetExistence && isEditing){
    return <EditCard tweetContent={tweetContent} userId={userId} displayName={userDisplayName} tweetId={tweetId} updateEditState={updateEditState}/>
} else return <h1>Couldn't locate tweet</h1>
}

export default TweetCard

import React, { useState } from 'react'
import TweetCard from './TweetCard'

const Feed = ({tweets}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [tweetsPerPage] = useState(6)

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
    <div className='feed'>
        <ul>
            {tweets.length > 0 ?
            <ul>
                {currentTweets.map((tweet, index)=> {
                    return(
                        <li key={index}>
                        <TweetCard tweetId={tweet.id} userId={tweet.author}/>
                    </li>
                    )
            })}
            </ul>
            :   <div>
                    <p>No Tweets available</p>
                </div>
            }
        </ul>
        <div>
            <button onClick={prevPage}>Previous page</button>
            <button onClick={nextPage}>Next page</button>
        </div>
    </div>
  )
}

export default Feed

import React, { useState } from 'react'
import TweetCard from './TweetCard'
import '../styles/feed.css'

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
            {tweets.length > 0 ?
            <ul className='feed-tweets'>
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
        <div  className="pagination-controls">
            {tweets.length > 6 && <div>
                <button onClick={prevPage}>Previous page</button>
                <button onClick={nextPage}>Next page</button>
            </div>}
        </div>
    </div>
  )
}

export default Feed

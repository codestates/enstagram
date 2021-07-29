import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';
import { serverUrl } from '../utils/constants'
// import { dummyPosts, dummyMyUserInfo } from '../dummyData/index'
import './Main.css';

export default function MainPage({ userData, accessToken, userWrittenPost }) {
  const [allPosts, setAllPosts] = useState([]);

  // TODO: Uncomment below to fetch all posts
  useEffect(() => {
    axios.get(`${serverUrl}/getmainpage`, {
      headers: {
        // Authorization: accessToken
        Authorization: `'Bearer ${accessToken}'`
      }
    }).then( res => {
        setAllPosts(res.data.data)
    })
  }, [accessToken]);

  function postJustWritten() {
    if (userWrittenPost) {
      let userInfo = {
        profilePhoto: userData.profilePhoto,
        id: userWrittenPost.user_id
      }
      return (<div key={userWrittenPost.id} className="post-outer-wrapper">
      <div className="post-inner-wrapper">
        <Post
          activePost={userWrittenPost}
          loggedInUserInfo={userData}
          userInfo={userInfo}
        />
      </div>
    </div>)
    }
  }
  
  return (
    <div>
      {postJustWritten()}
      {allPosts && allPosts.map(post => {
        let userInfo = {
          profilePhoto: post.userProfilePhoto,
          id: post.user_id
        }

        return (
          <div key={post.id} className="post-outer-wrapper">
            <div className="post-inner-wrapper">
              <Post
                activePost={post}
                loggedInUserInfo={userData}
                userInfo={userInfo}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}


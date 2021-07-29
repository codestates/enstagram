import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';
import { serverUrl } from '../utils/constants'
import { dummyPosts, dummyMyUserInfo } from '../dummyData/index'
import './Main.css';

// TODO: delete when getmainpage response includes profilePicture
// const userInfo = {
//   profilePhoto: 'http://thumbnail.10x10.co.kr/webimage/image/basic600/349/B003499095-1.jpg?cmd=thumb&w=400&h=400&fit=true&ws=false'
// };

// TODO: remove dummyMyUserInfo for userData
// export default function MainPage({ userData=dummyMyUserInfo, accessToken }) {
export default function MainPage({ userData, accessToken }) {
  const [allPosts, setAllPosts] = useState([]);

  // TODO: Uncomment below to fetch all posts
  useEffect(() => {
    axios.get(`${serverUrl}/getmainpage`, {
      headers: {
        // Authorization: accessToken
        Authorization: `'Bearer ${accessToken}'`
      }
    }).then( res => {
      console.log("all post: ", res.data.data);
        setAllPosts(res.data.data)
    })
  }, [accessToken]);
  
  return (
    <div>
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


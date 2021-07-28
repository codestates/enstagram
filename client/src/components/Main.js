import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';
import { serverUrl } from '../utils/constants'
import { dummyPosts, dummyMyUserInfo } from '../dummyData/index'
import './Main.css';

// TODO: delete when getmainpage response includes profilePicture
const userInfo = {
  profilePhoto: 'http://thumbnail.10x10.co.kr/webimage/image/basic600/349/B003499095-1.jpg?cmd=thumb&w=400&h=400&fit=true&ws=false'
};

// TODO: remove dummyMyUserInfo for userData
// export default function MainPage({ userData=dummyMyUserInfo, accessToken }) {
export default function MainPage({ userData, accessToken, userWrittenPost = null }) {
  const [allPosts, setAllPosts] = useState([]);
  // TODO: 유저가 방금 작성한 포스트를 메인 페이지 최상단 포스트로 띄우기
  console.log("The post that the user have just written: ", userWrittenPost) 
  // TODO: Uncomment below to fetch all posts
  useEffect(() => {
    axios.get(`${serverUrl}/getmainpage`, {
      headers: {
        // Authorization: accessToken
        Authorization: `Barear ${accessToken}`
      }
    }).then( res => {
        console.log("all post data: ", res.data);
        setAllPosts(res.data.data)
    })
  }, [accessToken]);

  useEffect(() => {
    setAllPosts(dummyPosts);
  }, [])
  return (
    <div>
      {userWrittenPost ? "유저가 방금 작성한 포스트" : null}
      {allPosts && allPosts.map(post => {
        // let userInfo = {
        //   profilePhoto: post.profilePhoto
        // }
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
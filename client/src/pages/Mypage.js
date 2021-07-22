import React from 'react'
import "./Mypage.css";
import { dummyPosts, placeHolderImage } from '../dummyData';

const dummyUserForMyPage = {
    username: 'Kakao-Ryan',
    followers: 123,
    following: 300,
    profilePhoto: placeHolderImage,
    name: 'Ryan Kim'
}
const Mypage = ({ posts = dummyPosts, userInfo=dummyUserForMyPage }) => {
    /**
     * TODO:
     * 1) Logout Handler
     * 2) Link to profile edit page
     * 3) More CSS fix
     * 4) Add a Modal component to show post detail
     */
    return (
        <div>
            <div className="my-profile-field">
                <div className="my-profile-container">
                    <div className="my-profile-picture-container">
                        <img alt="my-profile-pic" src={userInfo.profilePhoto} />
                    </div>

                    {/* profile pic 옆에 들어갈 부분 3줄*/}
                    <div className="my-profile-body-container" >
                        <div className="user-actions">
                            <p id="username">{userInfo.username}</p>
                            <div className="btn-primary edit-profile">프로필 편집</div>
                            <div className="btn-primary logout">로그아웃</div>
                        </div>
                        <div className="page-details">
                            <div><strong>{posts.length}</strong> posts</div>
                            <div><strong>{userInfo.followers}</strong> followers</div>
                            <div><strong>{userInfo.following}</strong> following</div>
                        </div>
                        <div className="name">{userInfo.name}</div>
                    </div>
                </div>
            </div>

            <div className="gallery-container">
                <div className="gallery-list-body">
                    {posts.map((post, idx)=>
                        <div className="gallery-image-wrapper">
                            <img src={post.picture} alt={post.content} /> 
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
  }
export default Mypage
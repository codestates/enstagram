import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./Mypage.css";
import { Modal } from '../components/Post'
import { dummyOtherUserInfo, dummyMyUserInfo } from '../dummyData';
import { serverUrl } from '../utils/constants'

const OtherUserPage = ({ loggedInUserInfo = dummyMyUserInfo }) => {
    // Initial states
    const [otherUserInfo, setOtherUserInfo] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activePost, setActivePost] = useState(null);

    // Get userid from route: in App.js <Route path="/:userId">
    const { userId } = useParams();

    // Fetch user information from the API: https://app.gitbook.com/@wjswlgh96/s/enstagram/#otheruserspage
    // API Route: users?accountName="accountName"
    // useEffect(() => {
    //     axios.get(`${serverUrl}/users`, { params: { accountName: userId } }).then((res) => {
    //         // Update userInfo state on userId change
    //         setOtherUserInfo(res);
    //     });
    // }, [userId])

    useEffect(() => {
        setOtherUserInfo(dummyOtherUserInfo)
    }, [])

    const clickPostHandler = (post) => {
        setIsModalOpen(true)
        setActivePost(post)
    }

    const commentHandler = (comment) => {
        const newOtherUserInfo = {
            ...otherUserInfo,
            posts: [...otherUserInfo.posts].map(post => {
                if (post === activePost) {
                   post.comments.push(comment);
                }
                return post;
            })
        }
        setOtherUserInfo(newOtherUserInfo);
    }

    return (
        <div>
            <div className="my-profile-field">
                <div className="my-profile-container">
                    <div className="my-profile-picture-container">
                        <img alt="my-profile-pic" src={otherUserInfo.profilePhoto} />
                    </div>

                    <div className="my-profile-body-container" >
                        <div className="user-actions">
                            <p id="username">{otherUserInfo.username}</p>
                            <div className="btn-primary">Follow</div>
                            {/* <Link className="btn-primary edit-profile" to="/profile-edit"><div>프로필 편집</div></Link> */}
                            {/* <div className="btn-primary logout" onClick={handleLogout}>로그아웃</div> */}
                        </div>
                        <div className="page-details">
                            <div><strong>{otherUserInfo.posts && otherUserInfo.posts.length}</strong> posts</div>
                            <div><strong>{otherUserInfo.followers}</strong> followers</div>
                            <div><strong>{otherUserInfo.following}</strong> following</div>
                        </div>
                        <div className="name">{otherUserInfo.username}</div>
                    </div>
                </div>
            </div>

            <div className="gallery-container">
                <div className="gallery-list-body">
                    {otherUserInfo.posts && otherUserInfo.posts.map((post, idx)=>
                        <div key={idx} className="gallery-image-wrapper" onClick={()=> {clickPostHandler(post)}}>
                            <img src={post.picture} alt={post.content} />
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen &&
                <Modal post={activePost} commentHandler={commentHandler} loggedInUserInfo={loggedInUserInfo} onModalClose={setIsModalOpen}
            />}
        </div>
    )
  }
export default OtherUserPage
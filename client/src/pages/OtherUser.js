import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./Mypage.css";
import "./OtherUser.css"
import { Modal } from '../components/Post'
import { dummyOtherUserInfo, dummyMyUserInfo, otherUserPosts } from '../dummyData';
import { serverUrl } from '../utils/constants'

const OtherUserPage = ({ loggedInUserInfo }) => {
    // Initial states
    const [userInfo, setUserInfo] = useState({});
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activePost, setActivePost] = useState(null);
    const [follower, setFollower] = useState([]);
    const [following, setFollowing] = useState([]);

    // Get userid from route: in App.js <Route path="/:userId">
    const { userId } = useParams();
    // Initial Setup
    useEffect(() => {
        // Fetch user information from the API: https://app.gitbook.com/@wjswlgh96/s/enstagram/#getuserinfo
        axios.get(`${serverUrl}/getuser`, { params: { user_id: userId } }).then((res) => {
            const userData = res.data.data
            // TODO: Handle error when user doesn't exist.
            setUserInfo(userData);
        });
        // GET: getPost 요청으로 post information 받기
        axios.get(`${serverUrl}/getpost`, { params: { user_id: userId } }).then((res) => {
            setPosts(res.data.data);
        });
        //GET: following list 받기
        axios.get(`${serverUrl}/getfollower`, { params: { user_id: userId } }).then((res) => {
            setFollowing(res.data.data);
        });
        axios.get(`${serverUrl}/getfollowing`, { params: { user_id: userId } }).then((res) => {
            setFollower(res.data.data);
        });
    }, [userId])

    const clickPostHandler = (post) => {
        setIsModalOpen(true)
        setActivePost(post)
    }

    const handleFollow = async (bFollow) => {
        // Update DB
        await axios.post(`${serverUrl}/follow`,
            { user_id: loggedInUserInfo.id, target_id: Number(userId) })
            .then(result => {

                console.log("보내주는 user 의 ID", userId);
                console.log("현재 로그인한 user 의 ID", loggedInUserInfo);
                console.log("result 의 메세지:", result.data.message);

                if (result.data.message === '팔로우 성공') {
                    console.log("loggedInUserInfo:", loggedInUserInfo);
                    console.log("follower:", follower);

                    if (follower.indexOf(loggedInUserInfo.id) < 0) {
                        if (follower.length === 0) {
                            const newFollower = [loggedInUserInfo.id];
                            setFollower(newFollower);
                        } else {
                            const newFollower = [...follower, loggedInUserInfo.id]
                            setFollower(newFollower);
                        }
                    }
                } else if (result.data.message === '언팔로우 성공') {
                    console.log("Unfollower:", follower);
                    const newFollower = follower.filter(el => el !== loggedInUserInfo.id)
                    setFollower(newFollower);
                }
            });
    }

    return (
        <div>
            <div className="my-profile-field">
                <div className="my-profile-container">
                    <div className="my-profile-picture-container">
                        <img alt="my-profile-pic" src={userInfo.profilePhoto} />
                    </div>

                    <div className="my-profile-body-container" >
                        <div className="user-actions">
                            <p id="username">{userInfo.username}</p>
                            {follower.includes(loggedInUserInfo.id)
                                ? <div className="btn-primary" onClick={() => handleFollow(false)}>Unfollow</div>
                                : <div className="btn-primary follow" onClick={() => handleFollow(true)}>Follow</div>
                            }
                        </div>
                        <div className="page-details">
                            <div><strong>{posts && posts.length}</strong> 게시물</div>
                            <div><strong>{follower.length}</strong> 팔로워</div>
                            <div><strong>{following.length}</strong> 팔로잉</div>
                        </div>
                        <div className="name">{userInfo.username}</div>
                    </div>
                </div>
            </div>

            <div className="gallery-container">
                <div className="gallery-list-body">
                    {posts && posts.map((post, idx) =>
                        <div key={idx} className="gallery-image-wrapper" onClick={() => { clickPostHandler(post) }}>
                            <img src={post.pictures} alt={post.content} />
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen &&
                <Modal
                    post={activePost}
                    loggedInUserInfo={loggedInUserInfo}
                    onModalClose={setIsModalOpen}
                    userInfo={userInfo}
                />
            }
        </div>
    )
}
export default OtherUserPage
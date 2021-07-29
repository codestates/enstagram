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
    const [follow, setFollow] = useState(false);
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

    // useEffect(() => {
    //     //GET: follower list 받기
    //     axios.get(`${serverUrl}/getfollowing`, { params: { user_id: userId } }).then((res) => {
    //         console.log("set follower get follwing: ", res.data.data)
    //         setFollower(res.data.data);
    //         console.log("follower state before : ", follower);
    //     }).then(() => {
    //         console.log("follower state after: ", follower);
    //         if (follower.includes(loggedInUserInfo.id)) {
    //             setFollow(true);
    //         } else {
    //             setFollow(false);
    //         }
    //     });
    // // }, [userId, follower])
    // }, [userId])

    const clickPostHandler = (post) => {
        setIsModalOpen(true)
        setActivePost(post)
    }

    const toggleFollowing = (value) => {
        setFollow(!value);
    }

    const handleFollow = (follow) => {
        // Update DB
        axios.post(`${serverUrl}/follow`,
            { user_id: loggedInUserInfo.id, target_id: userId})
        .then((res) => {
            if(follow) {
                const newFollower = [...follower, loggedInUserInfo.id]
                setFollower(newFollower);
            } else {
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
                    {posts && posts.map((post, idx)=>
                        <div key={idx} className="gallery-image-wrapper" onClick={()=> {clickPostHandler(post)}}>
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
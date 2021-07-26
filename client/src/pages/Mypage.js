import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import "./Mypage.css";
import { Modal } from '../components/Post'
import { dummyMyUserInfo, dummyPosts } from '../dummyData';
import { serverUrl } from '../utils/constants'

const MyPage = ({ loggedInUserInfo = dummyMyUserInfo, setIsLogin }) => {
    // Initial states
    const [userInfo, setUserInfo] = useState({});
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activePost, setActivePost] = useState(null);

    const userId = loggedInUserInfo.id;

    // Initial Setup
    // useEffect(() => {
    //     // Fetch user information from the API: https://app.gitbook.com/@wjswlgh96/s/enstagram/#otheruserspage
    //     // API Route: users?username="accountName" 요청으로 유저 정보 뱓기
    //     axios.get(`${serverUrl}/users`, { params: { username: userId } }).then((res) => {
    //         setUserInfo(res);
    //     });
    //     // GET: getPost 요청으로 post information 받기
    //     axios.get(`${serverUrl}`, { params: { username: userId } }).then((res) => {
    //         setPosts(res);
    //     })
    // }, [userId])

    // Initial Setup: before API is ready
    useEffect(() => {
        setUserInfo(loggedInUserInfo)
        setPosts(dummyPosts)
    }, [loggedInUserInfo])

    const history = useHistory();
    const handleLogout = () => {
        axios.post(`${serverUrl}/logout`).then((res)=> {
            setIsLogin(false);
            history.push('/');
        })
    }

    const clickPostHandler = (post) => {
        setIsModalOpen(true)
        setActivePost(post)
    }

    const commentHandler = (comment) => {
        const newPosts = [...posts].map(post => {
            if (post === activePost) {
                if (post.comments) {
                    post.comments.push(comment);
                } else {
                    post.comments = [comment];
                }
            }
            return post;
        })

        setPosts(newPosts);
    }

    const likeHandler = (like) => {
        if (like) { //  add user id to like_id array and return like count for active post using array.length
            const newPosts = [...posts].map(post => {
                if(post === activePost){
                    post.like_id.push(loggedInUserInfo.id)
                }
                return post
            })
            setPosts(newPosts)
        } else { // Decrease like count
            const newPosts = [...posts].map(post => {
                if(post === activePost){
                    post.like_id = post.like_id.filter(el => el !== loggedInUserInfo.id )
                }
                return post
            })
            setPosts(newPosts)
        }
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
                            <Link className="btn-primary edit-profile" to="/profile-edit"><div>프로필 편집</div></Link>
                            <div className="btn-primary logout" onClick={handleLogout}>로그아웃</div>
                        </div>
                        <div className="page-details">
                            <div><strong>{userInfo.posts && userInfo.posts.length}</strong> posts</div>
                            <div><strong>{userInfo.followers}</strong> followers</div>
                            <div><strong>{userInfo.following}</strong> following</div>
                        </div>
                        <div className="name">{userInfo.username}</div>
                    </div>
                </div>
            </div>

            <div className="gallery-container">
                <div className="gallery-list-body">
                    {posts && posts.map((post, idx)=>
                        <div key={idx} className="gallery-image-wrapper" onClick={()=> {clickPostHandler(post)}}>
                            <img src={post.picture} alt={post.content} />
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen &&
                <Modal 
                    post={activePost}
                    commentHandler={commentHandler}
                    likeHandler={likeHandler}
                    loggedInUserInfo={loggedInUserInfo}
                    onModalClose={setIsModalOpen}
                    userInfo={userInfo}
                />
            }
        </div>
    )
}
export default MyPage
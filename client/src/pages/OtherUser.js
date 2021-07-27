import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./Mypage.css";
import { Modal } from '../components/Post'
import { dummyOtherUserInfo, dummyMyUserInfo, otherUserPosts } from '../dummyData';
import { serverUrl } from '../utils/constants'

const OtherUserPage = ({ loggedInUserInfo = dummyMyUserInfo }) => {
    // Initial states
    const [userInfo, setUserInfo] = useState({});
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activePost, setActivePost] = useState(null);

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
        })
    }, [userId])

    // Initial Setup: before API is ready
    // useEffect(() => {
    //     setUserInfo(dummyOtherUserInfo)
    //     setPosts(otherUserPosts)
    // }, [])

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

    console.log("POSTs",posts)
    //TODO: when API is updated, change username to id
    const commentDeleteHandler = (comment) => {
        const newPosts = [...posts].map(post => {
            if(post === activePost){
                post.comments = post.comments.filter(el => el.id !== comment.id)
            }
            return post
        })
        setPosts(newPosts)
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
                            <div className="btn-primary">Follow</div>
                        </div>
                        <div className="page-details">
                            <div><strong>{posts && posts.length}</strong> posts</div>
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
                            <img src={post.pictures} alt={post.content} />
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen &&
                <Modal
                    post={activePost}
                    commentHandler={commentHandler}
                    commentDeleteHandler={commentDeleteHandler}
                    likeHandler={likeHandler}
                    loggedInUserInfo={loggedInUserInfo}
                    onModalClose={setIsModalOpen}
                    userInfo={userInfo}
                />
            }
        </div>
    )
}
export default OtherUserPage
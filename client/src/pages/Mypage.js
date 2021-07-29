import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import "./Mypage.css";
import Post, { Modal } from '../components/Post'
import { dummyMyUserInfo, dummyPosts, placeHolderImage } from '../dummyData';
import { serverUrl } from '../utils/constants'

// USER INFO
// comment_id: []
// createdAt: "2021-07-28T10:21:11.000Z"
// email: "jhoryong@gmail.com"
// follower_id: []
// following_id: []
// id: 4
// like_id: []
// name: "test1"
// post_id: (5) [7, 8, 10, 11, 12]
// profilePhoto: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
// updatedAt: "2021-07-28T12:31:28.000Z"
// username: "test1"

const MyPage = ({ loggedInUserInfo = dummyMyUserInfo, setIsLogin }) => {
    console.log("You are on MYPAGE. Here is user info:", loggedInUserInfo);

    // Initial states
    const [userInfo, setUserInfo] = useState(loggedInUserInfo);
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activePost, setActivePost] = useState(null);
    //let { path, url } = useRouteMatch();

    const userId = loggedInUserInfo.id;

    // Initial Setup
    // useEffect(() => {
    //     // Fetch user information from the API: https://app.gitbook.com/@wjswlgh96/s/enstagram/#getuserinfo
    //     axios.get(`${serverUrl}/getuser`, { params: { user_id: userId } }).then((res) => {
    //         const userData = res.data.data
    //         setUserInfo(userData);
    //     });
    //     // GET: getPost 요청으로 post information 받기
    //     axios.get(`${serverUrl}/getpost`, { params: { user_id: userId } }).then((res) => {
    //         setPosts(res.data.data);
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

    // const commentHandler = (comment) => {
    //     const newPosts = [...posts].map(post => {
    //         if (post === activePost) {
    //             if (post.comments) {
    //                 post.comments.push(comment);
    //             } else {
    //                 post.comments = [comment];
    //             }
    //         }
    //         return post;
    //     })

    //     setPosts(newPosts);
    // }

    // //TODO: when API is updated, change username to id
    // const commentDeleteHandler = (comment) => {
    //     const newPosts = [...posts].map(post => {
    //         if(post === activePost){
    //             post.comments = post.comments.filter(el => el.username !== comment.username)
    //         }
    //         return post
    //     })
    //     setPosts(newPosts)
    // }

    // const likeHandler = (like) => {
    //     if (like) { //  add user id to like_id array and return like count for active post using array.length
    //         const newPosts = [...posts].map(post => {
    //             if(post === activePost){
    //                 post.like_id.push(loggedInUserInfo.id)
    //             }
    //             return post
    //         })
    //         setPosts(newPosts)
    //     } else { // Decrease like count
    //         const newPosts = [...posts].map(post => {
    //             if(post === activePost){
    //                 post.like_id = post.like_id.filter(el => el !== loggedInUserInfo.id )
    //             }
    //             return post
    //         })
    //         setPosts(newPosts)
    //     }
    // }
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
                            <Link 
                                className="btn-primary edit-profile" 
                                to={`/mypage/edit`}
                            >
                                <div>프로필 편집</div>
                            </Link>
                            <div className="btn-primary logout" onClick={handleLogout}>로그아웃</div>
                        </div>
                        <div className="page-details">
                            <div><strong>{userInfo.post_id && userInfo.post_id.length}</strong> posts</div>
                            <div><strong>{userInfo.follower_id.length}</strong> followers</div>
                            <div><strong>{userInfo.following_id.length}</strong> following</div>
                        </div>
                        <div className="name">{userInfo.username}</div>
                    </div>
                </div>
            </div>

            <div className="gallery-container">
                <div className="gallery-list-body">
                    {posts && posts.map((post, idx)=>
                        <div key={idx} className="gallery-image-wrapper" onClick={()=> {clickPostHandler(post)}}>
                            {/* 로그인 구현되고 나면 post.picture를 post.pictures로 바꾸기*/}
                            <img src={post.picture} alt={post.content} />
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
export default MyPage


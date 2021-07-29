import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import "./Mypage.css";
import Post, { Modal } from '../components/Post'
// import { dummyMyUserInfo, dummyPosts, placeHolderImage } from '../dummyData';
import { serverUrl } from '../utils/constants'

const MyPage = ({ loggedInUserInfo, setIsLogin }) => {
    // Initial states
    const [userInfo, setUserInfo] = useState({});
    // const [userInfo, setUserInfo] = useState(loggedInUserInfo);

    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activePost, setActivePost] = useState(null);
    const [follower, setFollower] = useState([]);
    const [following, setFollowing] = useState([]);
    //let { path, url } = useRouteMatch();

    const userId = loggedInUserInfo.id;
    // console.log("LOGINUSER", loggedInUserInfo)
    // Initial Setup
    useEffect(() => {
        // Fetch user information from the API: https://app.gitbook.com/@wjswlgh96/s/enstagram/#getuserinfo
        axios.get(`${serverUrl}/getuser`, { params: { user_id: userId } }).then((res) => {
            const userData = res.data.data
            setUserInfo(userData);
        });
        // GET: getPost 요청으로 post information 받기
        axios.get(`${serverUrl}/getpost`, { params: { user_id: userId } }).then((res) => {
            setPosts(res.data.data);
        })
        //GET: following list 받기
        axios.get(`${serverUrl}/getfollower`, { params: { user_id: userId } }).then((res) => {
            setFollowing(res.data.data);
        })
        //GET: follower list 받기
        axios.get(`${serverUrl}/getfollowing`, { params: { user_id: userId } }).then((res) => {
            setFollower(res.data.data);
        })
    }, [userId])

    const history = useHistory();
    const handleLogout = () => {
        console.log("LOGOUT")
        axios.post(`${serverUrl}/logout`, { user_id: loggedInUserInfo.id}).then((res)=> {
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
export default MyPage


import React, { useState, useEffect } from 'react';
import './Post.css';
import { dummyUserForMyPage } from '../pages/Mypage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { serverUrl } from '../utils/constants'
import axios from 'axios';
import { timeSince } from '../utils/timeSince';

// postUserInfo should be removed when post (currentPost) has userProfilePicture information so we can just do: { currentPost.userProfilePicture }
// or we will need to fetch postUserInfo based on currentPost.username
const Post = ({ currentPost, loggedInUserInfo, postUserInfo = dummyUserForMyPage }) => {
    const [comment, setComment] = useState('');
    const [like, setLike] = useState(null);

    // Set like information on component load
    useEffect(() => {
        // 1) fetch like information: whether user liked the post or not
        // 2) setLike state with the response from 1. (i.e., setLike(res))
    }, [])

    const likeClickHandler = () => {
        axios.post(`${serverUrl}/like`, {
            postId: currentPost.id,
            userId: loggedInUserInfo.id, // loggedIn user
            like: true
        }).then((res)=>{
            // setLike(true)
            if(res === 'success') {
                setLike(!like);
            }
        })
    }

    const commentChangeHandler = (e) => {
        const str = e.target.value;
        setComment(str)
    }

    const commentSubmitHandler = () => {
        console.log("commentSubmitHandler")
        axios.post(`${serverUrl}/comment`, {
            comment: comment,
            userId: loggedInUserInfo.id,
            postId: currentPost.id,
        }).then((res) => {
            if (res === 'success') {
                // update comment state
                const newComment = {
                    username: loggedInUserInfo.username,
                    content: comment
                }
                const newCurrentPost = {
                    ...currentPost,
                    comments: [...currentPost.comments, newComment]
                }
                currentPost = newCurrentPost;
            }
        })
    }

    // If Post information can't include post owner's profile picture
    // const getUserPictureByUserId = (userId) => {
    //     axios.get('/user-profile-pic').then(res => {
    //         setUserProfilePic(res.profilePicture)
    //     })
    // }

    return (
        <div className="post-wrapper">
            <div className="post-user-container">
                <div className="post-user-profile">
                {/* postUserInfo should be removed when post (currentPost) has userProfilePicture information 
                so we can just do: { currentPost.userProfilePicture }
                or we will need to fetch postUserInfo based on currentPost.username */}
                    <img alt="user-profile-pic" src={postUserInfo.profilePhoto} />
                    {/* <img alt="user-profile-pic" src={currentPost.userProfilePicture} /> */}
                    </div>
                <div className="post-username">{currentPost.username}</div>
            </div>
            <div className="post-image-container">
                <img src={currentPost.picture} alt={currentPost.content} />
            </div>
            <div className="like-btn-container" onClick={likeClickHandler}>
                {like
                ? <FontAwesomeIcon className="like-icon icon-filled" icon={filledHeart} />
                : <FontAwesomeIcon className="like-icon" icon={faHeart} />}
            </div>
            <div className="liked-by-container">
                {currentPost.like}명이 좋아합니다
            </div>
            <div className="post-content-container">
                <p><span className="post-username">{currentPost.username}</span>
                {currentPost.content}</p>
            </div>
            <div className="comments-container">
                {currentPost.comments && currentPost.comments.map((comment, idx) =>
                    <p key={idx}><span className="comment-username">{comment.username}</span>
                    {comment.content}</p>
                )}
            </div>
            <div className="time-container">{timeSince(currentPost.updatedAt)}</div>
            <div className="comment-input-container">
                <input className="comment-input" type="text" placeholder="Add a comment..." value={comment} onChange={commentChangeHandler}/>
                <button className="post-button" type="submit" onClick={commentSubmitHandler} disabled={comment.length === 0}>Post</button>
            </div>
        </div>
    )
}

export const Modal = ({ post, loggedInUserInfo, onModalClose }) => {
    return (
        <div id='post' className="modal"
            onClick={(e) => {
                if(e.target.id === 'post'){onModalClose(false)}
            }}>
            <Post currentPost={post} loggedInUserInfo={loggedInUserInfo}  />
        </div>
    )
}

export default Post




import React, { useState } from 'react';
import './Post.css';
import { dummyUserForMyPage } from '../pages/Mypage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const Post = ( { currentPost, postUserInfo = dummyUserForMyPage }) => {
    const [comment, setComment] = useState('')
    const parsedDate = new Date(currentPost.createdAt).toDateString()
    
    const commentPostHandler = (e) => {
        const str = e.target.value;
        setComment(str)
    }

    return (
        <div className="post-wrapper">
            <div className="post-user-container">
                <div className="post-user-profile">
                    <img alt="user-profile-pic" src={postUserInfo.profilePhoto} />
                    </div>
                <div className="post-username">{postUserInfo.username}</div>
            </div>
            <div className="post-image-container">
                <img src={currentPost.picture} alt={currentPost.content} />
            </div>
            <div className="like-btn-container">
                <FontAwesomeIcon className="like-icon" icon={faHeart} />
            </div>
            <div className="liked-by-container">
                {currentPost.like}명이 좋아합니다
            </div>
            <div className="post-content-container">
                <p><span className="post-username">{postUserInfo.username}</span>
                {currentPost.content}</p>
            </div>
            <div className="comments-container">
                {currentPost.comments && currentPost.comments.map((comment, idx) =>
                    <p key={idx}><span className="comment-username">{comment.username}</span>
                    {comment.content}</p>
                )}
            </div>
            <div className="time-container">{parsedDate}</div>
            <div className="comment-input-container">
                <input className="comment-input" type="text" placeholder="Add a comment..." value={comment} onChange={commentPostHandler}/>
                <button className="post-button" disabled={comment.length === 0}>Post</button>
            </div>
        </div>
    )
}

export const Modal = ({ post, onModalClose }) => {
    return (
        <div id='post' className="modal" 
            onClick={(e) => {
                console.log(e.target.id)
                if(e.target.id === 'post'){onModalClose(false)}
            }}>
            <Post currentPost={post} />
        </div>
    )
}

export default Post




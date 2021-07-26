import React, { useState, useEffect } from 'react';
import './Post.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { serverUrl } from '../utils/constants'
import axios from 'axios';
import { timeSince } from '../utils/timeSince';

const Post = ({ activePost, loggedInUserInfo, commentHandler, likeHandler, userInfo }) => {
    const [comment, setComment] = useState('');
    const [like, setLike] = useState(false);

    useEffect(() => {
        //로그인 한 유저가 포스트를 좋아했는지 activePost.liked_id에 포함 되어있는지 확인
        //포함 되어있으면 이미 좋아요 누른 상태
        //없으면 좋아요 안 한 상태
        if(activePost.like_id && activePost.like_id.includes(loggedInUserInfo.id)){
            setLike(true)
        } else {
            setLike(false)
        }
    }, [activePost.like_id, loggedInUserInfo.id])

    const likeClickHandler = () => {
        // axios.post(`${serverUrl}/like`, {
        //     postId: activePost.id,
        //     userId: loggedInUserInfo.id, // loggedIn user
        //     like: true
        // }).then((res)=>{
        //     // setLike(true)
        //     if(res === 'success') {
        //         setLike(!like);
        //     }
        // })

        // Uncomment above when API is ready
        // Set like + Update post info: activePost.like
        setLike(!like);
        likeHandler(!like);
    }

    const commentChangeHandler = (e) => {
        const str = e.target.value;
        setComment(str)
    }

    const commentSubmitHandler = () => {
        const newComment = {
            content: comment,
            username: loggedInUserInfo && loggedInUserInfo.username
        }
        // TODO: Uncomment Below when API is ready
        // axios.post(`${serverUrl}/comment`, {
        //     comment: newComment,
        //     userId: loggedInUserInfo && loggedInUserInfo.id,
        //     postId: activePost.id,
        // }).then((res) => {
        //     if (res === 'success') {
        //         // update comment state
        //         commentHandler(newComment)
        //         setComment('');
        //     }
        // })
        commentHandler(newComment)
        setComment('');
    }

    return (
        <div className="post-wrapper">
            <div className="post-user-container">
                <div className="post-user-profile">
                    <img alt="user-profile-pic" src={userInfo.profilePhoto} />
                    </div>
                <div className="post-username">{activePost.username}</div>
            </div>
            <div className="post-image-container">
                <img src={activePost.picture} alt={activePost.content} />
            </div>
            <div className="like-btn-container" onClick={likeClickHandler}>
                {like
                ? <FontAwesomeIcon className="like-icon icon-filled" icon={filledHeart} />
                : <FontAwesomeIcon className="like-icon" icon={faHeart} />}
            </div>
            <div className="liked-by-container">
                {activePost.like_id && activePost.like_id.length}명이 좋아합니다
            </div>
            <div className="post-content-container">
                <p><span className="post-username">{activePost.username}</span>
                {activePost.content}</p>
            </div>
            <div className="comments-container">
                {activePost.comments && activePost.comments.map((comment, idx) => {
                    return (
                        <p key={idx}>
                            <span className="comment-username">{comment && comment.username}</span>
                            {comment && comment.content}
                        </p>
                    )
                })}
            </div>
            <div className="time-container">{timeSince(activePost.updatedAt)}</div>
            <div className="comment-input-container">
                <input className="comment-input" type="text" placeholder="Add a comment..." value={comment} onChange={commentChangeHandler}/>
                <button className="post-button" type="submit" onClick={commentSubmitHandler} disabled={comment.length === 0}>Post</button>
            </div>
        </div>
    )
}

export const Modal = ({ post, userInfo, loggedInUserInfo, likeHandler, commentHandler, onModalClose }) => {
    return (
        <div id='post' className="modal"
            onClick={(e) => {
                if(e.target.id === 'post'){onModalClose(false)}
            }}>
            <Post
                activePost={post}
                commentHandler={commentHandler}
                userInfo={userInfo}
                likeHandler={likeHandler}
                loggedInUserInfo={loggedInUserInfo}
            />
        </div>
    )
}

export default Post




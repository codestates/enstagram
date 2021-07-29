import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Post.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { serverUrl } from '../utils/constants'
import axios from 'axios';
import { timeSince } from '../utils/timeSince';

const Post = ({ activePost, loggedInUserInfo, userInfo }) => {
    //Comment created by typing on the input
    const [comment, setComment] = useState('');
    //Below is the actual list of comments
    const [commentList, setCommentList] = useState([]);
    const [likeList, setLikeList] = useState([]);

    useEffect(() => {
        //post에 있는 comment 정보 가져오기
        axios.get(`${serverUrl}/getcomment`, {
            params: {
                post_id: activePost.id,
            }
        }).then(res => {
            setCommentList(res.data.data)
        })

        //post에 있는 like 정보 가져오기
        axios.get(`${serverUrl}/getlike`, {
            params: {
                post_id: activePost.id,
            }
        }).then(res => {
            setLikeList(res.data.data)
        })
    }, [activePost.id, loggedInUserInfo.id])

    const likeClickHandler = async (like) => {
        await axios.post(`${serverUrl}/like`, {
            user_id: Number(loggedInUserInfo.id), // loggedIn user
            post_id: Number(activePost.id),
        }).then(async (res) => {

            if (res.data.message === '좋아요 정보 설정 완료') {
                if (res.data.data.value === true) { //  add user id to like_id array and return like count using array.length
                    if (likeList.indexOf(res.data.data.user_id) < 0) {
                        const newLikeList = [...likeList, res.data.data.user_id]
                        await setLikeList(newLikeList)
                    }
                } else if (res.data.data.value === false) { // Decrease like count
                    const newLikeList = likeList.filter(el => {
                        return el !== res.data.data.user_id
                    });
                    await setLikeList(newLikeList)
                }
            }
        })
    }

    const commentChangeHandler = (e) => {
        const str = e.target.value;
        setComment(str)
    }

    const commentSubmitHandler = () => {
        axios.post(`${serverUrl}/createcomment`, {
            user_id: loggedInUserInfo && loggedInUserInfo.id,
            post_id: activePost.id,
            content: comment,
        }).then((res) => {

            // console.log("으아아아아아아아", res);

            if (res.data.message === '코멘트 생성 성공') {
                const commentId = res.data.data.id;
                const commentForStateUpdate = {
                    content: comment,
                    id: commentId,
                    username: loggedInUserInfo.username
                }
                commentHandler(commentForStateUpdate)
                setComment('');
            }
        })
    }

    const commentHandler = (comment) => {

        console.log("commentssssssssss", comment);

        const newCommentList = [...commentList, comment]
        setCommentList(newCommentList);
    }

    const commentDeleteHandler = (comment) => {
        const newCommentList = [...commentList].filter(el => el.id !== comment.id)
        setCommentList(newCommentList)
    }

    const commentDelete = (commentes) => {
        // For database update:

        console.log("comments.id:", commentes);

        axios.delete(`${serverUrl}/deletecomment`, {
            data: { comment_id: commentes.id, }
        }).then((res) => {
            if (res.data.message === '코멘트 삭제 완료') {
                commentDeleteHandler(commentes);
            } else if (res.data.message === '해당하는 정보의 comment 가 없습니다') {
                console.log("문제를 찾아라");
            }
        })
    }

    return (
        <div className="post-wrapper">
            <Link className="user-information-link" to={`/${userInfo.id}`}>
                <div className="post-user-container">
                    <div className="post-user-profile">
                        <img alt="user-profile-pic" src={userInfo.profilePhoto} />
                    </div>
                    <div className="post-username">{activePost.username}</div>
                </div>
            </Link>
            <div className="post-image-container">
                <img src={activePost.pictures} alt={activePost.content} />
            </div>
            <div className="like-btn-container">
                {likeList && likeList.includes(loggedInUserInfo.id)
                    ? <FontAwesomeIcon onClick={() => likeClickHandler(false)} className="like-icon icon-filled" icon={filledHeart} />
                    : <FontAwesomeIcon onClick={() => likeClickHandler(true)} className="like-icon" icon={faHeart} />}
            </div>
            <div className="liked-by-container">
                {likeList && likeList.length}명이 좋아합니다
            </div>
            <div className="post-content-container">
                <p><span className="post-username">{activePost.username}</span>
                    {activePost.content}</p>
            </div>
            <div className="comments-container">
                {commentList && commentList.map((comment, idx) => {
                    return (
                        <p key={idx} className="comment-content">
                            <span className="comment-username">{comment && comment.username}</span>
                            {comment && comment.content}
                            {comment.username === loggedInUserInfo.username &&
                                <span onClick={() => commentDelete(comment)} className="comment-delete">X</span>
                            }
                        </p>
                    )
                })}
            </div>
            <div className="time-container">{timeSince(activePost.updatedAt)}</div>
            <div className="comment-input-container">
                <input className="comment-input" type="text" placeholder="Add a comment..." value={comment} onChange={commentChangeHandler} />
                <button className="post-button" type="submit" onClick={commentSubmitHandler} disabled={comment.length === 0}>Post</button>
            </div>
        </div>
    )
}

export const Modal = ({ post, userInfo, loggedInUserInfo, likeHandler, commentHandler, commentDeleteHandler, onModalClose }) => {
    return (
        <div id='post' className="modal"
            onClick={(e) => {
                if (e.target.id === 'post') { onModalClose(false) }
            }}>
            <Post
                activePost={post}
                commentHandler={commentHandler}
                userInfo={userInfo}
                // likeHandler={likeHandler}
                loggedInUserInfo={loggedInUserInfo}
            // commentDeleteHandler={commentDeleteHandler}
            />
        </div>
    )
}

export default Post




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
    const [like, setLike] = useState(false);
    const [likeList, setLikeList] = useState([]);

    useEffect(() => {
        //post에 있는 comment 정보 가져오기
        axios.get(`${serverUrl}/getcomment`, {
            params: {
                post_id: activePost.id,
            }
        }).then( res => {
            setCommentList(res.data.data)
        })
    }, [activePost.id, loggedInUserInfo.id])

    useEffect(() => {
        //post에 있는 like 정보 가져오기
        axios.get(`${serverUrl}/getlike`, {
            params: {
                post_id: activePost.id,
            }
        }).then( res => {
            // res.data.data is user id list
            console.log("LIKE userid list line 38", res.data.data)
            setLikeList(res.data.data)
        })
        //로그인 한 유저가 포스트를 좋아했는지 activePost.liked_id에 포함 되어있는지 확인
        //포함 되어있으면 이미 좋아요 누른 상태
        //없으면 좋아요 안 한 상태

        // .then((res)=>{
        //     
        //     console.log("INCLUDES",likeList)
        //     console.log("INCLUDES ID",loggedInUserInfo.id)
        //     console.log("TRUE/FALSE",likeList.includes(loggedInUserInfo.id))
        //     if(likeList && likeList.includes(loggedInUserInfo.id)){
        //     setLike(true)
        // } else {
        //     setLike(false)
        // }})
        //포스트가 켜진 상태에서 refresh하면 true인데 나갔다가 들어오면 false and likelist가 빈 배열
        console.log("INCLUDES",likeList)
        console.log("INCLUDES ID",loggedInUserInfo.id)
        console.log("TRUE/FALSE",likeList.includes(loggedInUserInfo.id))
        if(likeList && likeList.includes(loggedInUserInfo.id)){
            setLike(true)
        } else {
            setLike(false)
        }
    }, [])
    
    const likeClickHandler = () => {
        console.log("in likeclickhandler", like)
        axios.post(`${serverUrl}/like`, {
            user_id: loggedInUserInfo.id, // loggedIn user
            post_id: activePost.id,
            value: !like
        }).then((res)=>{
            if(res.data.message === '좋아요 정보 설정 완료') {
                likeHandler(res.data.value, loggedInUserInfo.id)
                setLike(!like);
            }
        })

        // Uncomment above when API is ready
        // Set like + Update post info: activePost.like
        // setLike(!like);
        // likeHandler(!like);
    }

    //To update the list of liked user id
    const likeHandler = (like, id) => {
        if (like) { //  add user id to like_id array and return like count using array.length
            const newLikeList = [...likeList, id]
            setLikeList(newLikeList)
            console.log("WHEN True", newLikeList)
        } else { // Decrease like count
            const newLikeList= [...likeList].filter(el => el !== id)
            setLikeList(newLikeList)
            console.log("WHEN false", newLikeList)
        }
    }
    

    const commentChangeHandler = (e) => {
        const str = e.target.value;
        setComment(str)
    }

    const commentSubmitHandler = () => {
        // TODO: Uncomment Below when API is ready & when login feature is complete
        axios.post(`${serverUrl}/createcomment`, {
            user_id: loggedInUserInfo && loggedInUserInfo.id,
            post_id: activePost.id,
            content: comment,
        }).then((res) => {
            if (res.data.message === '코멘트 생성 성공') {
                const commentId = res.data.id;
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
        const newCommentList = [...commentList, comment]
        setCommentList(newCommentList);
    }

    const commentDeleteHandler = (comment) => {
        const newCommentList = [...commentList].filter(el => el.id !== comment.id)
        setCommentList(newCommentList)
    }

    const commentDelete = (comment) => {
        // For database update:
        console.log("comment Delete")
        axios.delete(`${serverUrl}/deletecomment`, {
            // CORS error
            data: {comment_id: comment.id,}
        }).then((res) => {
            console.log("Res delete : ", res)
            if(res.data.message === '코멘트 삭제 완료') {
                console.log("COMMENT", res)
                commentDeleteHandler(comment);
            }
        })
        // For local state update, we need to call commentDeleteHandler
        // commentDeleteHandler(comment);
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
            <div className="like-btn-container" onClick={() => likeClickHandler()}>
                {like
                ? <FontAwesomeIcon className="like-icon icon-filled" icon={filledHeart} />
                : <FontAwesomeIcon className="like-icon" icon={faHeart} />}
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
                <input className="comment-input" type="text" placeholder="Add a comment..." value={comment} onChange={commentChangeHandler}/>
                <button className="post-button" type="submit" onClick={commentSubmitHandler} disabled={comment.length === 0}>Post</button>
            </div>
        </div>
    )
}

export const Modal = ({ post, userInfo, loggedInUserInfo, likeHandler, commentHandler, commentDeleteHandler, onModalClose }) => {
    return (
        <div id='post' className="modal"
            onClick={(e) => {
                if(e.target.id === 'post'){onModalClose(false)}
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




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';
import { serverUrl } from '../utils/constants'

export default function MainPage({ accessToken }) {
  const [allPosts, setAllPosts] = useState([]);
  // Fetch all posts
  useEffect(() => {
    axios.get(`${serverUrl}/getAllPosts`, {
      headers: {
        Authorization: 'Bearer ' + accessToken //the token is a variable which holds the token
      }
    }).then( res => {
        console.log("all post data: ", res.data);
        setAllPosts(res.data.data)
    })
  }, [])

  return (
    <div>
        allPosts data will be rendered once we have it
    </div>
  )
}

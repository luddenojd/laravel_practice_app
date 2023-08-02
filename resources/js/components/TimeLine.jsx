import React, { useEffect, useState } from 'react'
import Post from './Post'
import NewPost from './NewPost'

const TimeLine = () => {
  const [posts, setPosts] = useState([])

  const getToken = () => {
    return localStorage.getItem('token')
  }

  const getPosts = async () => {
    const token = getToken()
    if(token) {
      try {
        const response = await axios.get('http://localhost:8000/api/posts', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setPosts(response.data)
      } catch (error) {

      }
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className="timeline-wrapper">
      <NewPost />
      {posts?.map((post) => (
        <Post
        key={post.id}
        post={post}
        />
      ))}
    </div>
  )
}

export default TimeLine

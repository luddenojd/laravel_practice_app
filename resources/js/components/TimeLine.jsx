import React, { useEffect, useState } from 'react'
import Post from './Post'

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
        console.log(response)
        setPosts(response.data)
      } catch (error) {

      }
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div>
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

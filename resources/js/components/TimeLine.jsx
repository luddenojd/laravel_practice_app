import React, { useEffect, useState } from 'react'
import Post from './Post'
import NewPost from './NewPost'

const TimeLine = () => {
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [activeUser, setActiveUser] = useState({})
  const [isLiked, setIsLiked] = useState(false)

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

  const getActiveUser = async () => {
    const token = getToken()
    if(token) {
      try {
        const response = await axios.get('http://localhost:8000/api/activeuser', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        setActiveUser(response.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    getPosts()
  }, [open, isLiked])

  useEffect(() => {
    getActiveUser()
  }, [])

  return (
    <div className="timeline-wrapper">
      <NewPost
      open={open}
      setOpen={setOpen}
      />
      {posts?.map((post) => (
        <Post
        key={post.id}
        post={post}
        activeUser={activeUser}
        setIsLiked={setIsLiked}
        isLiked={isLiked}
        />
      ))}
    </div>
  )
}

export default TimeLine

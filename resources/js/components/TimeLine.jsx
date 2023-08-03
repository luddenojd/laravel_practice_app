import React, { useEffect, useState } from 'react'
import Post from './Post'
import NewPost from './NewPost'
import ClipLoader from "react-spinners/ClipLoader"

const TimeLine = () => {
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [activeUser, setActiveUser] = useState({})
  const [isLiked, setIsLiked] = useState(false)
  const [isCommented, setIsCommented] = useState(false)
  const [loading, setLoading] = useState(true)

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

      } finally {
        setLoading(false)
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
  }, [open, isLiked, isCommented])

  useEffect(() => {
    getActiveUser()
  }, [])

  return (
    <div className="timeline-wrapper">
      {loading
      ?
      <div className="loading-wrapper">
        <ClipLoader />
      </div>
      :
      <>
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
        setIsCommented={setIsCommented}
        isCommented={isCommented}
        />
      ))}
      </>
      }

    </div>
  )
}

export default TimeLine

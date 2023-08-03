import React, { useState, useEffect } from 'react'
import { AiOutlineLike, AiOutlineComment } from 'react-icons/ai'
import { IconContext } from "react-icons"

const Post = ({post, activeUser, setIsLiked, isLiked}) => {
  const [hasLiked, setHasLiked] = useState(false)

  const getToken = () => {
    return localStorage.getItem('token')
  }

  const likePost = async (postId) => {
    const token = getToken()
    if(token) {
      try {
        const response = await axios.post('http://localhost:8000/api/likes', {
          post_id: postId,
          user_id: activeUser.id
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setIsLiked(!isLiked)
      } catch (error) {

      }
    }
  }
  useEffect(() => {
    if (activeUser.id && post.likes.some((like) => like.user_id === activeUser.id)) {
      setHasLiked(true)
    } else {
      setHasLiked(false)
    }
  }, [activeUser, post.likes, isLiked])

  return (
    <div className="post-wrapper">
      <div className="name-img-wrapper">
        <img src={`storage/${post.user.profile_pic ? post.user.profile_pic : 'profile_pictures/noimage.png'}`} alt="" />
        <p>{post.user.name}</p>
      </div>
      <p className="post-content">{post.content}</p>
      <img src={`storage/${post.image}`} alt="" />
      <div className="likes-comments-counters" >
        <div className="likes-counter">
          {post.likes.length
          ?
          <IconContext.Provider value={{ size: "15px" }}>
            <AiOutlineLike />
          </IconContext.Provider>
          :
          ""
          }
          <p>{post.likes.length ? post.likes.length : ""}</p>
        </div>
        <p className="comments-counter">{post.comments.length ?`${post.comments.length} kommentarer` : ""}</p>
      </div>
      <div className="button-container">
        <button onClick={() => likePost(post.id)} >
          <IconContext.Provider value={{ color: hasLiked ? "blue" : "inherit", size: "20px" }}>
              <AiOutlineLike />
          </IconContext.Provider>
          <p style={{ color: hasLiked ? "blue" : "inherit" }} >Gilla</p>
        </button>
        <button>
          <IconContext.Provider value={{ size: "20px" }}>
              <AiOutlineComment />
          </IconContext.Provider>
          <p>Kommentera</p>
        </button>
      </div>
    </div>
  )
}

export default Post

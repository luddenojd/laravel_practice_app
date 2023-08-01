import React from 'react'
import { AiOutlineLike, AiOutlineComment } from 'react-icons/ai'
import { IconContext } from "react-icons"

const Post = ({post}) => {
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
        <button>
          <IconContext.Provider value={{ size: "20px" }}>
              <AiOutlineLike />
          </IconContext.Provider>
          <p>Gilla</p>
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

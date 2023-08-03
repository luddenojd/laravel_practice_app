import React, { useState } from 'react'
import TheComment from './TheComment'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { IconContext } from "react-icons"

const Comments = ({ comments, activeUser, post, openComments, setOpenComments }) => {
  const [newComment, setNewComment] = useState('')

  const getToken = () => {
    return localStorage.getItem('token')
  }

  const postComment = async () => {
    const token = getToken()
    if(token && newComment !== "") {
      try {
        const response = await axios.post('http://localhost:8000/api/comments', {
          post_id: post.id,
          user_id: activeUser.id,
          content: newComment
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      } catch (error) {

      }
    }
  }

  const handleKey = (e) => {
    if(e.key === "Enter") {
      postComment()
    }
  }

  return (
    <div className="comments-wrapper">
      <div>
        <button className="back-button" onClick={() => setOpenComments(false)}>
          <IconContext.Provider value={{ color: "#495057", size: "30px" }}>
            <AiOutlineArrowLeft />
          </IconContext.Provider>
        </button>
      </div>
      <div className="comments-scroll-wrapper">
        {comments.length ? comments?.map((comment) => (
          <TheComment key={comment.id} comment={comment} />
        )) :
        <div className="no-comments">
          <h3>Inlägget har inga kommentarer</h3>
        </div> }
      </div>
      <div className="comment-input-wrapper">
        <input
        type="text"
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={(e) => handleKey(e)}                placeholder="Skriv en kommentar"
        />
      </div>
    </div>
  )
}

export default Comments

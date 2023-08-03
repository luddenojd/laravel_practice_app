import React from 'react'

const TheComment = ({ comment }) => {
  console.log(comment)
  return (
    <div className="the-comment-wrapper">
      <img src={`storage/${comment.user.profile_pic ? comment.user.profile_pic : 'profile_pictures/noimage.png'}`} alt="" />
      <div className="comment-section">
        <p className="comment-name">{comment.user.name}</p>
        <p>{comment.content}</p>
      </div>
    </div>
  )
}

export default TheComment

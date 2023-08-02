import React, { useEffect, useState } from 'react'
import { IconContext } from "react-icons"
import CreateNewPost from './CreateNewPost'

const NewPost = ({open, setOpen}) => {
  const [content, setContent] = useState('')

  return (
    <div className="new-post-wrapper">
      <div className="create-post-button">
        <button onClick={() => setOpen(!open)}>
          <p>Skapa ett nytt inlägg</p>
        </button>
      </div>
      {open
        &&
        <CreateNewPost setOpen={setOpen} />
      }
    </div>
  )
}

export default NewPost

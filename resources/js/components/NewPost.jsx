import React, { useEffect, useState } from 'react'
import { IconContext } from "react-icons"
import CreateNewPost from './CreateNewPost'

const NewPost = () => {
  const [content, setContent] = useState('')
  const [open, setOpen] = useState(false)

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

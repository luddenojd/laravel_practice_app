import React, { useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { BsImageFill } from 'react-icons/bs'
import { IconContext } from "react-icons"

const CreateNewPost = ({ setOpen }) => {
  const [content, setContent] = useState('Vad gör du just nu?')

  return (
    <div className="create-new-post-wrapper">
      <div className="buttons-wrapper">
        <button className="back-button" onClick={() => setOpen(false)}>
        <IconContext.Provider value={{ color: "#495057", size: "20px" }}>
          <AiOutlineArrowLeft />
        </IconContext.Provider>
          <p>Tillbaka</p>
        </button>
        <button className="publish-button">
          <p>Publicera</p>
        </button>
      </div>
      <textarea onChange={(e) => setContent(e.target.value)} placeholder="Vad tänker du på?"></textarea>
      <div className="post-image">
        <IconContext.Provider value={{ color: "black", size: "25px" }}>
          <BsImageFill />
        </IconContext.Provider>
        <p>Lägg till en bild</p>
      </div>
      <img src="" alt="" />
    </div>
  )
}

export default CreateNewPost

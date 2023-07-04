import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { IconContext } from "react-icons"

const AlertMessage = ({message}) => {
  return (
    <div className="alert-wrapper">
      <div className="alert-box">
        <IconContext.Provider value={{ color: "green", size: "40px" }}>
          <AiOutlineCheckCircle />
        </IconContext.Provider>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default AlertMessage

import React, { useState, useEffect } from 'react'

const ChatBox = ({ convo, messages, activeUser }) => {
  const [conversation, setConversation] = useState([])

  const filterMessages = () => {
    let temp = messages
      .filter(
        (m) =>
          m.user_id === convo.user_id || m.receiver_id === convo.user_id
      )
      .sort((a, b) => {
        const dateA = new Date(a.created_at)
        const dateB = new Date(b.created_at)

        return dateA - dateB
      })
    setConversation(temp)
  }

  useEffect(() => {
    filterMessages()
  }, [convo])

  return (
    <>
    <div className="chatbox-wrapper">
      {conversation?.map((curr) => (
        <div>
        <p className={curr.receiver_id === activeUser.id ? "my-message" : "my-message sender"}>{curr.message}</p>
        </div>
      ))}
    </div>
    <div className="input-area">
        <input type="text" />
        <button>Skicka</button>
    </div>
    </>
  )
}

export default ChatBox

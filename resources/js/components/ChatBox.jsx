import React, { useState, useEffect } from 'react'

const ChatBox = ({ convo, messages, activeUser }) => {
  const [conversation, setConversation] = useState([])
  const [message, setMessage] = useState('')

  const getToken = () => {
    return localStorage.getItem('token')
  }

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

  const handleKey = (e) => {
    if(e.key === "Enter") {
      sendMessage()
    }
  }

  const sendMessage = async () => {
    const token = getToken()
    if(token) {
      try {
        const response = await axios.post(`http://localhost:8000/api/sendmessage`, {
          receiver_id: convo.user_id,
          message: message
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setConversation(response.data)
        setMessage('')
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    filterMessages()
  }, [convo])


  return (
    <>
    <div className="chatbox-wrapper">
      {conversation?.map((curr) => (
        <div>
        <p className={curr.receiver_id === activeUser.id ? "my-message sender" : "my-message"}>{curr.message}</p>
        </div>
      ))}
    </div>
    <div className="input-area">
      <input
        value={message}
        onKeyDown={(e) => handleKey(e)}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
      />
      <button onClick={sendMessage}>Skicka</button>
    </div>
    </>
  )
}

export default ChatBox

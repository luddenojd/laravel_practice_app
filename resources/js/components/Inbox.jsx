import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader"
import ChatBox from './ChatBox'

const Inbox = () => {
  const [messages, setMessages] = useState([])
  const [filteredMessages, setFilteredMessages] = useState([])
  const [activeUser, setActiveUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [convo, setConvo] = useState({})
  const [open, setOpen] = useState(false)

  const getToken = () => {
    return localStorage.getItem('token')
  }

  const readMessage = async (id) => {
    const token = getToken()
    if(token) {
      try {
        const response = await axios.post(`http://localhost:8000/api/readmessage`, {
          is_read: true,
          message_id: id
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getActiveUser = async () => {
    const token = getToken()
    if(token) {
      try {
        const response = await axios.get('http://localhost:8000/api/activeuser', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setActiveUser(response.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getMessages = async () => {
    const token = getToken()
    if (token) {
      try {
        const response = await axios.get('http://localhost:8000/api/messages', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const uniqueMessages = []
        const messagesMap = new Map()

        for (const message of response.data) {
          messagesMap.set(message.user_id, message)
        }

        uniqueMessages.push(...messagesMap.values())

        setFilteredMessages(uniqueMessages)
        setMessages(response.data)
      } catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    }
  }

  const openMessage = (message) => {
    setConvo(message)
    setOpen(true)
    readMessage(message.id)
  }

  useEffect(() => {
    getActiveUser()
    getMessages()
  }, [])

  return (
    <div className="inbox-wrapper">
      <h1>Inkorg</h1>
      {loading
      ?
      <div className="loading-wrapper">
        <ClipLoader />
      </div>
      :
      filteredMessages.map((message) => (
        <>
        {activeUser.id !== message.user_id &&
        <div onClick={() => openMessage(message)} key={message.id} className={message.is_read ? "inbox-message read" : "inbox-message"}>
          <p>{message.sender_name}</p>
        </div>
        }
        </>
      ))}
      <ChatBox
        activeUser={activeUser}
        messages={messages}
        convo={convo}
      />
    </div>
  )
}

export default Inbox

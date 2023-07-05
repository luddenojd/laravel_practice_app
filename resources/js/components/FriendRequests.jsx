import React, { useState, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader"
import AlertMessage from './AlertMessage'

const FriendRequests = ({ getMyFriends }) => {
  const [friendRequests, setFriendRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [friendAdded, setFriendAdded] = useState(false)
  const [activeUser, setActiveUser] = useState({})
  const [users, setUsers] = useState([])

  const getToken = () => {
    return localStorage.getItem('token')
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

  const getAllUsers = async () => {
    const token = getToken()
    if(token) {
      try {
        const response = await axios.get('http://localhost:8000/api/allusers', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUsers(response.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getFriendRequests = async () => {
    const token = getToken()
    if(token) {
      try {
        const response = await axios.get('http://localhost:8000/api/myFriendRequests', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setFriendRequests(response.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const acceptFriendRequest = async (friendRequestId) => {
    const token = getToken()
    if(token) {
      try {
        const response = await axios.post('http://localhost:8000/api/acceptFriendRequest',
        {
          friend_request_id: friendRequestId
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setFriendAdded(true)
        setTimeout(() => {
          setFriendAdded(false)
        }, 2000);
        getMyFriends()
      } catch (error) {

      }
    }
  }
  useEffect(() => {
    getAllUsers()
    getActiveUser()
  }, [])

  useEffect(() => {
    getFriendRequests()
  }, [friendAdded])

  return (
    <div className="friend-req-wrapper">
      {friendAdded
        &&
        <AlertMessage message={'Vänförfrågan beviljad'} />
        }
      <h4>Vänförfrågningar</h4>
      {loading ?
      <ClipLoader />
      :
      friendRequests ? (friendRequests?.map((req) => (
        <div key={req.id} className="accept-box">
        {req.status === 'pending' && req.user_id !== activeUser.id
        ?
        <>
        <p>{req.friend_name} har skickat en vänförfrågan till dig!</p>
        <div className="button-wrapper">
          <button onClick={() => acceptFriendRequest(req.id)}>
            <p>Acceptera</p>
          </button>
          <button>
            <p>Neka</p>
          </button>
        </div>
        </>
        :
        req.user_id === activeUser.id && req.status === 'pending'
        ?
        <p>Du har skickat en vänförfrågan till {users.filter((curr) => curr.id === req.friend_id)[0].name}</p>
        :
        ''
        }
        </div>
      )))
      :
      ''
    }
    </div>
  )
}

export default FriendRequests

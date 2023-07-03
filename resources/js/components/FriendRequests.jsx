import React, { useState, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader"

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [friendAdded, setFriendAdded] = useState(false)

  const getToken = () => {
    return localStorage.getItem('token')
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
        // setFriendRequests(Object.values(response.data))
        setFriendAdded(true)
      } catch (error) {

      }
    }
  }

  useEffect(() => {
    getFriendRequests()
  }, [friendAdded])

  return (
    <div className="friend-req-wrapper">
      <h4>Vänförfrågningar</h4>
      {loading ?
      <ClipLoader />
      :
      friendRequests ? (friendRequests?.map((req) => (
        <div key={req.id} className="accept-box">
        {req.status === 'pending'
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
        friendAdded
        ?
        <p>Vänförfrågan beviljad!</p>
        :
        <p>Du har inga vänförfrågningar</p>
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

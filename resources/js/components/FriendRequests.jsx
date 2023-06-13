import React, { useState, useEffect } from 'react'

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([])

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
      } catch (error) {

      }
    }
  }

  useEffect(() => {
    getFriendRequests()
  }, [])


  return (
    <div className="friend-req-wrapper">
      <h4>Vänförfrågningar</h4>
      {friendRequests.length ? (friendRequests?.map((req) => (
        <div className="accept-box">
        <p key={req.id}>{req.friend_name} har skickat en vänförfrågan till dig!</p>
        <div className="button-wrapper">
          <button onClick={() => acceptFriendRequest(req.id)}>
            <p>Acceptera</p>
          </button>
          <button>
            <p>Neka</p>
          </button>
        </div>
        </div>
      )))
      :
      <p>Du har inga vänförfrågningar</p>
    }
    </div>
  )
}

export default FriendRequests

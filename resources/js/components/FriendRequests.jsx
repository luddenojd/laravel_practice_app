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
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    getFriendRequests()
  }, [])


  return (
    <div>
      {friendRequests.length ? (friendRequests?.map((req) => (
        <div>
        <p key={req.id}>{req.friend_name} har skickat en vänförfrågan till dig!</p>
        <div>
          <button>
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

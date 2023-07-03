import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { IconContext } from "react-icons"

const Logout = () => {

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token')

      await axios.post('http://localhost:8000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      localStorage.removeItem('token')
      window.location.href = '/'
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <button onClick={handleLogout} className="logout-button">
        <h1>Logga ut</h1>
        <IconContext.Provider value={{ color: "white", size: "25px" }}>
          <AiOutlineLogout />
        </IconContext.Provider>
      </button>
    </div>
  )
}

export default Logout;

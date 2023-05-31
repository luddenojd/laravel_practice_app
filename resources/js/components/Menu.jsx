import React, { useState, useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import Logout from './Logout'

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const getToken = () => {
    return localStorage.getItem('token')
  }

  useEffect(() => {
    const token = getToken()
    if(token) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [])
  return (
    <div className="menu-wrapper">
      {isOpen
          ?
        <div className="main-menu">
          <div className="closing-wrapper">
            <button onClick={() => setIsOpen(!isOpen)} >
              <GrClose />
            </button>
          </div>
          <Link onClick={() => setIsOpen(!isOpen)} className="route-links" to="/">Alla filmer</Link>
          <Link onClick={() => setIsOpen(!isOpen)} className="route-links" to="/registrera">Registrera</Link>
          {loggedIn ?
           <Logout />
           :
           <Link onClick={() => setIsOpen(!isOpen)} className="route-links" to="/loggain">Logga in</Link>
           }

        </div>
          :
        <button onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu />
        </button>
      }

      <div className="backdrop" />
    </div>
  );
};

export default Menu;

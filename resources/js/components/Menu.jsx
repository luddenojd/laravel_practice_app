import React, { useState, useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import movieClapper from '../../img/movie-clapper-open.svg'
import { IconContext } from "react-icons"

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
      {!isOpen &&
           <img src={movieClapper} className="movie-clapper" alt="movie-clapper" />
           }

      {isOpen
          ?
        <div className="main-menu">
          <div className="closing-wrapper">
            <button onClick={() => setIsOpen(!isOpen)} >
              <GrClose />
            </button>
          </div>
          <Link onClick={() => setIsOpen(!isOpen)} className="route-links" to="/">Mina filmer</Link>
          <Link onClick={() => setIsOpen(!isOpen)} className="route-links" to="/allafilmer">Alla filmer</Link>

          {loggedIn ?
           <Logout />
           :
           <>
           <Link onClick={() => setIsOpen(!isOpen)} className="route-links" to="/registrera">Registrera</Link>
           <Link onClick={() => setIsOpen(!isOpen)} className="route-links" to="/loggain">Logga in</Link>
           </>
           }

        </div>
          :
          <IconContext.Provider value={{ size: "40px", className: "global-class-name" }}>
        <button className="burger-menu" onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu />
        </button>
</IconContext.Provider>

      }
    </div>
  );
};

export default Menu;

import React, { useState, useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import {
  AiOutlineHome,
  AiOutlineUsergroupAdd,
  AiOutlineMessage,
  AiOutlineUser
        } from 'react-icons/ai'
import { GrClose } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import movieClapper from '../../img/movie-clapper-open.svg'
import { IconContext } from "react-icons"

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')

  const getToken = () => {
    return localStorage.getItem('token')
  }

  const getAuthenticatedContent = async () => {
    const token = getToken()
    if (token) {
      try {
        const response = await axios.get('http://localhost:8000/api/movies', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserName(response.data.user.name)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    const token = getToken()
    if(token) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [])

  useEffect(() => {
    getAuthenticatedContent()
  }, [])


  return (
    <div className="menu-wrapper">
      <div className="desktop-menu">
      {loggedIn ?
          <>
            <Link className="route-links" to="/">
            {!isOpen &&
           <img src={movieClapper} className="movie-clapper" alt="movie-clapper" />
           }
            </Link>
            <Link className="route-links" to="/">{userName}</Link>
            <Link className="route-links" to="/allafilmer">Filmer</Link>
            <Link className="route-links" to="/anvandare">Användare</Link>
            <Link className="route-links" to="/vanner">Vänner</Link>
            <Link className="route-links" to="/inbox">Inkorg</Link>
           <Logout />
           </>
           :
           <>
            <Link className="route-links" to="/">
            {!isOpen &&
           <img src={movieClapper} className="movie-clapper" alt="movie-clapper" />
           }
            </Link>
           <Link  className="route-links" to="/registrera">Registrera</Link>
           <Link className="route-links" to="/loggain">Logga in</Link>
           </>
           }
      </div>
        <div className="main-menu">
          {loggedIn ?
          <>
            <Link onClick={() => setIsOpen(!isOpen)} className="route-links" to="/">
            <IconContext.Provider value={{ color: "white", size: "40px", }}>
              <AiOutlineHome />
            </IconContext.Provider>
            </Link>
            <Link onClick={() => setIsOpen(!isOpen)} className="route-links" to="/anvandare">
            <IconContext.Provider value={{ color: "white", size: "40px", }}>
              <AiOutlineUsergroupAdd />
            </IconContext.Provider>
            </Link>
            <Link onClick={() => setIsOpen(!isOpen)} className="route-links" to="/inbox">
            <IconContext.Provider value={{ color: "white", size: "40px", }}>
              <AiOutlineMessage />
            </IconContext.Provider>
            </Link>
            <Link onClick={() => setIsOpen(!isOpen)} className="route-links" to="/inbox">
            <IconContext.Provider value={{ color: "white", size: "40px", }}>
              <AiOutlineUser />
            </IconContext.Provider>
            </Link>
           <Logout />
           </>
           :
           <>
           <Link onClick={() => setIsOpen(!isOpen)} className="route-links" to="/registrera">Registrera</Link>
           <Link onClick={() => setIsOpen(!isOpen)} className="route-links" to="/loggain">Logga in</Link>
           </>
           }
        </div>
    </div>
  )
}

export default Menu

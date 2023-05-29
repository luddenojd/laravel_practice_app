import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom'

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="menu-wrapper">
      {isOpen
          ?
        <div className="main-menu">
          <Link to="/">Alla filmer</Link>
          <Link to="/registration">Registrera</Link>
          <Link to="/mymovies">Mina filmer</Link>
        </div>
          :
        <button>
          <GiHamburgerMenu />
        </button>
      }

      <div className="backdrop" />
    </div>
  );
};

export default Menu;

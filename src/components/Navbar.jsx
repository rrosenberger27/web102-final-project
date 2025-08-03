import React from 'react'
import { Link } from 'react-router'
import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <Link to="/">
        <h1 className='navbar-title'>ScreenQueue</h1>
      </Link>
      <div className='navbar-links'>
        <Link to="/gallery">
            <button className='navbar-button'>ScreenFeed</button>
        </Link>
        <Link to="/create">
            <button className='navbar-button'>Create Post</button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
import React from 'react'
import { Link } from 'react-router'
import '../styles/Home.css'

const Home = () => {
  return (
    <div className='home-container'>
      <h1> Welcome to ScreenQueue!  </h1>
      <p> A platform to share thoughts on upcoming shows and movies. Start a new thread about an unreleased project you find interesting, comment on existing posts, or simply have a look around! </p>
      <div className='home-buttons'>
        <Link to="/create">
          <button className='home-button'>Create a Post!</button>
        </Link>
        <Link to="/gallery">
          <button className='home-button'>Explore Posts!</button>
        </Link>
      </div>
    </div>
  )
}

export default Home
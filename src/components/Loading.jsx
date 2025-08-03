import React from 'react'
import '../styles/Loading.css'

const Loading = () => {
  return (
    <div className='loading-container'>
        <div className='loading-spinner'></div>
        <h1>Loading...</h1>
    </div>
  )
}

export default Loading
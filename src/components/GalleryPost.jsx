import React from 'react'
import '../styles/GalleryPost.css'

// only show creation time, title, and upvotes count -- need to be able to update the upvotes count

const GalleryPost = ({ post }) => {
  return (
    <div className='gallery-post' style={{ backgroundColor: post.background_color, color: post.text_color }}>
      <h1>{post.title}</h1>
    </div>
  )
}

export default GalleryPost
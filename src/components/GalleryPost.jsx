import React from 'react'
import '../styles/GalleryPost.css'
import { useState, useEffect } from 'react'
import supabase from '../client.js'

// only show creation time, title, and upvotes count -- need to be able to update the upvotes count

const GalleryPost = ({ post }) => {
    const [upvotes, setUpvotes] = useState(post.upvotes)
    useEffect(() => {
        supabase.from('gallery').update({ upvotes: upvotes }).eq('id', post.id).select()
        .then(({ data, error }) => {
            if (error) {
                console.error(error)
            } else {
                console.log(data)
            }
        })
    }, [upvotes])
  return (
    <div className='gallery-post' style={{ backgroundColor: post.background_color, color: post.text_color }}>
      <h1>{post.title}</h1>
      <p>Created: {new Date(post.created_at).toLocaleDateString()}</p>
      <p>Upvotes: {upvotes}</p>
     <button className='upvote-button-gallery' style={{ backgroundColor: post.text_color, color: post.background_color }} onClick={() => setUpvotes(upvotes + 1)}>&#8593;</button>
    </div>
  )
}

export default GalleryPost
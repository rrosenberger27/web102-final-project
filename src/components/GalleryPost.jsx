import React from 'react'
import '../styles/GalleryPost.css'
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { useNavigate } from 'react-router'

// only show creation time, title, and upvotes count -- need to be able to update the upvotes count

const GalleryPost = ({ post, fetchPosts }) => {
    const [upvotes, setUpvotes] = useState(post.upvotes)
    const navigate = useNavigate()

    const handleUpvote = async () => {
        const { data, error } = await supabase.from('posts').update({ upvotes: upvotes + 1 }).eq('id', post.id).select()
        if (error) {
            console.error(error)
        } else {
            setUpvotes(upvotes + 1)
            fetchPosts(true)
        }
    }

  return (
    <div className='gallery-post' style={{ backgroundColor: post.background_color, color: post.text_color }} onClick={() => navigate(`/view/${post.id}`)}>
      <h1>{post.title}</h1>
      <p>Created: {new Date(post.created_at).toLocaleString()}</p>
      <p>Upvotes: {upvotes}</p>
     <button className='upvote-button-gallery' style={{ backgroundColor: post.text_color, color: post.background_color }} onClick={e => {
        e.stopPropagation()
        handleUpvote(); 
     } }>⬆️</button>
    </div>
  )
}

export default GalleryPost
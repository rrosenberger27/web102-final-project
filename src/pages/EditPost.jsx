import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import "../styles/CreatePost.css"
import Loading from '../components/Loading'
import { supabase } from '../client'
import ColorSlider from '../components/ColorSlider'
import ExampleColorCard from '../components/ExampleColorCard'


const EditPost = ({onPostCreated}) => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id);
      if (error) {
        setError(error);
        console.error("Error fetching post", error);
      } else {
        console.log(data[0]);
        setPost(data[0]);
      }
      setLoading(false);
    };
    fetchPost();
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.title || !post.project_title) {
      alert("Please make sure the title and project title are filled in.");
      return;
    }

    if (post.release_month && !post.release_year) {
      alert("Release month cannot be filled in without a release year.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.from("posts").update(post).eq("id", id);

    if (error) {
      console.error(error);
      setLoading(false);
    } else {
      console.log(data);
      if (onPostCreated) {
        onPostCreated();
      }
      setLoading(false);
      navigate("/gallery");
    }
  };

  const deletePost = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this post?")) {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) {
        setError(error);
        console.error("Error deleting post", error);
      } else {
        navigate("/gallery");
        onPostCreated(false)
      }
    }
  };


  return (
    <div className='edit-post-container'>
      <div className='edit-buttons-container'>
        <button
          className="view-button"
          onClick={() => navigate(`/view/${id}`)}
        >
          ⬅️
        </button>
        <button
          className="delete-button"
          onClick={deletePost}
        >
          🗑️
        </button>
      </div>
      <div className="create-post-container">
      <h1 className="create-post-title">Edit Post</h1>
      {post && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Post Title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Movie/Show Title"
            value={post.project_title}
            maxLength={100}
            onChange={(e) =>
              setPost({ ...post, project_title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Release Year"
            maxLength={4}
            value={post.release_year}
            onChange={(e) => setPost({ ...post, release_year: e.target.value })}
          />
          <input
            type="text"
            placeholder="Release Month"
            maxLength={20}
            value={post.release_month}
            onChange={(e) =>
              setPost({ ...post, release_month: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Video URL"
            maxLength={500}
            value={post.video_url}
            onChange={(e) => setPost({ ...post, video_url: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={post.img_url}
            maxLength={500}
            onChange={(e) => setPost({ ...post, img_url: e.target.value })}
          />
          <textarea
            type="text"
            placeholder="Content"
            value={post.content}
            maxLength={500}
            rows="4"
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />
          <select className="create-post-category" value={post.category} onChange={(e) => setPost({ ...post, category: e.target.value })}>
            <option value="movie">Movie</option>
            <option value="show">Show</option>
          </select>
          <ColorSlider
            name="background_color"
            label="Background Color"
            post={post}
            color={post.background_color}
            setPost={setPost}
          />
          <ColorSlider
            name="text_color"
            label="Text Color"
            post={post}
            color={post.text_color}
            setPost={setPost}
          />
          <ExampleColorCard
            backgroundColor={post.background_color}
            textColor={post.text_color}
          />
          <button type="submit" className="create-post-button">
            Submit Edits
          </button>
        </form>
      )}
      {loading && <Loading />}
      {error && (
        <div className="error-message">
          An error occured while fetching or modifying the post
        </div>
      )}
    </div>  
    </div>
  )
}

export default EditPost
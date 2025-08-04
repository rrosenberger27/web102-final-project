import React from "react";
import { useState } from "react";
import { supabase } from "../client";
import ColorSlider from "../components/ColorSlider";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";
import "../styles/CreatePost.css";
import ExampleColorCard from "../components/ExampleColorCard";

const CreatePost = ({ onPostCreated }) => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    video_url: "",
    project_title: "",
    category: "movie",
    release_year: "",
    release_month: "",
    background_color: "#000000",
    text_color: "#ffffff",
    img_url: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    const { data, error } = await supabase.from("posts").insert(post).select();

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

  return (
    <div className="create-post-container">
      <h1 className="create-post-title">Create a Post</h1>
      <p className="create-post-subheading"> Note: Only title and project title must be filled in</p>
      {!loading && (
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
            Create Post
          </button>
        </form>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default CreatePost;

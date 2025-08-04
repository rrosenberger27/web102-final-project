import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { supabase } from "../client";
import Loading from "../components/Loading";
import "../styles/ViewPost.css";


const ViewPost = ({fetchPosts}) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [activeCommentText, setActiveCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [upvotes, setUpvotes] = useState(0);

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
        setUpvotes(data[0].upvotes);
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("postId", id)
      .order("created_at", { ascending: true });
    if (error) {
      setError(error);
      console.error("Error fetching comments", error);
    } else {
      setComments(data);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const handleUpvote = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("posts")
      .update({ upvotes: upvotes + 1 })
      .eq("id", id);
    if (error) {
      setError(error);
      console.error("Error upvoting post", error);
    } else {
      setUpvotes(upvotes + 1);
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
        fetchPosts(false)
      }
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("comments")
      .insert({ postId: id, content: activeCommentText });
    if (error) {
      setError(error);
      console.error("Error posting comment", error);
    } else {
      setActiveCommentText("");
      fetchComments();
    }
  };

  return (
    <div>
      {loading && <Loading />}
      {error && (
        <div className="error-message">
          An error occured while fetching or modifying the post
        </div>
      )}
      {post && (
        <div>
          <div
            className="view-post-container"
            style={{
              backgroundColor: post.background_color,
              color: post.text_color,
            }}
          >
            <div className="view-post-buttons">
              <button
                className="gallery-button"
                style={{ backgroundColor: post.text_color }}
                onClick={() => navigate("/gallery")}
              >
                ⬅️
              </button>
              <button
                className="edit-button"
                style={{ backgroundColor: post.text_color }}
                onClick={() => navigate(`/edit/${id}`)}
              >
                ✏️
              </button>
              <button
                className="delete-button"
                style={{ backgroundColor: post.text_color }}
                onClick={deletePost}
              >
                🗑️
              </button>
            </div>
            <div className="view-post-content">
              <h1 className="view-post-title">{post.title}</h1>
              <p className="view-post-date">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
              {post.img_url && (
                <img
                  src={post.img_url}
                  alt="No image Found"
                  className="view-post-img"
                />
              )}
              {post.video_url && (
                <a className="video-url" href={post.video_url} style={{color: post.text_color}}>
                  TRAILER/CLIP/VIDEO LINK
                </a>
              )}
              {post.category && (
                <p className="view-post-category">
                  {post.category.toUpperCase()}
                </p>
              )}
              {post.project_title && (
                <p className="view-post-project-title">{post.project_title}</p>
              )}
              {post.release_year && (
                <p className="view-post-release">
                  {" "}
                  Releases:{" "}
                  {post.release_month
                    ? `${post.release_month}, ${post.release_year}`
                    : post.release_year}
                </p>
              )}

              {post.content && (
                <>
                <p className="view-post-content-header">
                  Thoughts:
                </p>
                <p
                  className="view-post-content"
                >
                  {post.content}
                  </p>
                </>   
              )}
              <p className="view-post-upvotes">Upvotes: {upvotes}</p>
              <button
                className="view-post-upvote-button"
                style={{ backgroundColor: post.text_color }}
                onClick={handleUpvote}
              >
                ⬆️
              </button>
            </div>
          </div>
          <div className="comment-section-container">
            <div className="comments-container">
              {comments.map((comment) => (
                <div className="comment" key={comment.id}>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
            <form className="leave-comment-form" onSubmit={postComment}>
              <textarea
                className="leave-comment-input"
                type="text"
                placeholder="Leave a comment"
                value={activeCommentText}
                maxLength={200}
                onChange={(e) => setActiveCommentText(e.target.value)}
              />
              <button className="leave-comment-btn" type="submit">
                {" "}
                Comment{" "}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPost;

import { useState, useEffect, useCallback } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Gallery from "./pages/Gallery";
import ViewPost from "./pages/ViewPost";
import { supabase } from "./client.js";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async (upvoteUpdate) => {
    if (!upvoteUpdate) {
      setLoading(true);
    }
    const { data, error } = await supabase.from("posts").select("*");
    if (error) {
      console.error("Error fetching posts:", error);
      setError("Error fetching ScreenFeed. Please try again later.");
    } else {
      setPosts(data);
      setError(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts(false);
  }, [fetchPosts]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/create"
          element={<CreatePost onPostCreated={fetchPosts} />}
        />
        <Route path="/edit/:id" element={<EditPost onPostCreated={fetchPosts} />} />
        <Route
          path="/gallery"
          element={<Gallery posts={posts} loading={loading} error={error} fetchPosts={fetchPosts} />}
        />
        <Route path="/view/:id" element={<ViewPost fetchPosts={fetchPosts} />} />
      </Routes>
    </>
  );
}

export default App;

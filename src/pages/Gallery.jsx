import React from "react";
import GalleryPost from "../components/GalleryPost";
import "../styles/Gallery.css";
import Loading from "../components/Loading";
import { useState, useEffect, useMemo } from "react";

const Gallery = ({ posts, loading, error }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Any");
  const [rankBy, setRankBy] = useState("Popularity");

  const displayPosts = useMemo(() => {
    let filteredPosts = [...posts];
    if (searchTerm) {
      filteredPosts = filteredPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (category !== "Any") {
      filteredPosts = filteredPosts.filter(
        (post) => post.category === category
      );
    }
    if (rankBy === "Popularity") {
      filteredPosts.sort((a, b) => b.upvotes - a.upvotes);
    } else if (rankBy === "Newest") {
      filteredPosts.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (rankBy === "Oldest") {
      filteredPosts.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    }
    return filteredPosts;
  }, [posts, searchTerm, category, rankBy]);

  return (
    <>
      <h1 className="gallery-title">ScreenFeed</h1>
      {loading && <Loading />}
      {error && <div className="error-message">Error: {error.message}</div>}
      {!loading && !error && (
        <div className="gallery-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Any">Shows & Movies</option>
              <option value="movie">Movie</option>
              <option value="show">Show</option>
            </select>
            <div className="sort-container">
              <label>Sort by:</label>
              <select value={rankBy} onChange={(e) => setRankBy(e.target.value)}>   
                <option value="Popularity">Popularity</option>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
              </select>
            </div>
          </div>

          {displayPosts.map((displayPost) => (
            <GalleryPost key={displayPost.id} post={displayPost} />
          ))}
        </div>
      )}
    </>
  );
};

export default Gallery;

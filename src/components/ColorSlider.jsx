import React, { useState } from "react";
import "../styles/ColorSlider.css";

const ColorSlider = ({ name, label, color, post, setPost }) => {
  const [displayColor, setDisplayColor] = useState(color);

  const handleChange = (e) => {
    const hexColor = e.target.value;
    setPost({ ...post, [name]: hexColor });
    setDisplayColor(hexColor);
  };

  return (
    <div className="color-slider-container">
      <p className="color-slider-label">Post {label}</p>
      <input
        type="color"
        value={displayColor}
        onChange={handleChange}
        className="color-slider-input"
      />
    </div>
  );
};

export default ColorSlider;

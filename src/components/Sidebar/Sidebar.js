import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./Sidebar.css";

const categories = [
  "All",
  "Music",
  "Sports",
  "Gaming",
  "News",
  "Movies",
  "Technology",
  "Education",
  "Comedy",
  "Fashion",
  "Travel",
  "Food",
];

function Sidebar({ selectedCategory, setSelectedCategory, darkMode, isOpen, setIsOpen, navigate }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""} ${darkMode ? "dark" : ""}`}>
      <div className="sidebar-header">
        <h3 className="sidebar-title">Categories</h3>
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          <FaTimes />
        </button>
      </div>

      <div className="sidebar-content">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`sidebar-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => {
              setSelectedCategory(cat);
              setIsOpen(false);
              navigate("/");
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

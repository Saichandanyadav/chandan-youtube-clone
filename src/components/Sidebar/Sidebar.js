import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
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

function Sidebar({ selectedCategory, setSelectedCategory, darkMode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <div className={`app-container ${open ? "sidebar-open" : ""}`}>
      {!open && (
        <button className="menu-toggle" onClick={() => setOpen(true)}>
          <FaBars />
        </button>
      )}
      <div className={`sidebar ${open ? "open" : ""} ${darkMode ? "dark" : ""}`}>
        <div className="sidebar-header">
          <h3 className="sidebar-title">Categories</h3>
          <button className="close-btn" onClick={() => setOpen(false)}>
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
                setOpen(false);
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

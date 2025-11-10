import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaMoon, FaSun, FaHeart, FaHistory, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar({ darkMode, setDarkMode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [shrink, setShrink] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
      setShowSearch(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setShrink(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showSearch) inputRef.current?.focus();
  }, [showSearch]);

  return (
    <nav className={`navbar ${darkMode ? "dark" : ""} ${shrink ? "shrink" : ""}`}>
      {!showSearch && (
        <div
          className={`logo ${darkMode ? "dark-logo" : ""}`}
          onClick={() => navigate("/")}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube Logo"
          />
        </div>
      )}
      {(showSearch || window.innerWidth > 768) && (
        <form
          onSubmit={handleSubmit}
          className={`search-form ${showSearch ? "active" : ""}`}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      )}
      <div className="nav-right">
        {window.innerWidth <= 768 && (
          <button
            className="mobile-search"
            onClick={() => setShowSearch(!showSearch)}
          >
            {showSearch ? <FaTimes /> : <FaSearch />}
          </button>
        )}
        {!showSearch && (
          <>
            <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <button
              className="subscriptions-btn"
              onClick={() => navigate("/subscriptions")}
            >
              <FaHeart />
            </button>
            <button className="history-btn" onClick={() => navigate("/history")}>
              <FaHistory />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

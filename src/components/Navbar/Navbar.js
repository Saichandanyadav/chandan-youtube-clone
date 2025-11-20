import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaMoon, FaSun, FaHeart, FaHistory, FaTimes, FaBars } from "react-icons/fa";
import "./Navbar.css";

function Navbar({ darkMode, setDarkMode, isSidebarOpen, setIsSidebarOpen, setSelectedCategory }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [shrink, setShrink] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const inputRef = useRef(null);
  const navigate = useNavigate();

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
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showSearch) inputRef.current?.focus();
  }, [showSearch]);

  const showSearchForm = showSearch || windowWidth > 768;

  const goHome = () => {
    setSelectedCategory("All");
    navigate("/");
    setIsSidebarOpen(false);
  };

  return (
    <nav className={`navbar ${darkMode ? "dark" : ""} ${shrink ? "shrink" : ""}`}>
      <div className="nav-left">
        <button className="sidebar-toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FaBars />
        </button>

        {!showSearch && (
          <div className={`logo ${darkMode ? "dark-logo" : ""}`} onClick={goHome}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
              alt="YouTube Logo"
            />
          </div>
        )}
      </div>

      {showSearchForm && (
        <form onSubmit={handleSubmit} className={`search-form ${showSearch ? "active" : ""}`}>
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
        {windowWidth <= 768 && (
          <button className="mobile-search" onClick={() => setShowSearch(!showSearch)}>
            {showSearch ? <FaTimes /> : <FaSearch />}
          </button>
        )}

        {!showSearch && (
          <>
            <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <button className="subscriptions-btn" onClick={() => navigate("/subscriptions")}>
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

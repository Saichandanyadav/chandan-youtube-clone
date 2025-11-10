import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import SearchResults from "./pages/SearchResults/SearchResults";
import VideoDetail from "./pages/VideoDetail/VideoDetail";
import ChannelDetail from "./pages/ChannelDetail/ChannelDetail";
import WatchHistory from "./pages/WatchHistory/WatchHistory";
import SubscriptionsPage from "./pages/SubscriptionsPage/SubscriptionsPage";
import CustomerSupport from "./components/CustomerSupport/CustomerSupport";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route path="/search/:query" element={<SearchResults darkMode={darkMode} />} />
        <Route path="/video/:id" element={<VideoDetail darkMode={darkMode} />} />
        <Route path="/channel/:id" element={<ChannelDetail darkMode={darkMode} />} />
        <Route path="/history" element={<WatchHistory darkMode={darkMode} />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
      </Routes>
      <CustomerSupport />
    </BrowserRouter>
  );
}

export default App;

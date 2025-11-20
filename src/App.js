import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import SearchResults from "./pages/SearchResults/SearchResults";
import VideoDetail from "./pages/VideoDetail/VideoDetail";
import ChannelDetail from "./pages/ChannelDetail/ChannelDetail";
import WatchHistory from "./pages/WatchHistory/WatchHistory";
import SubscriptionsPage from "./pages/SubscriptionsPage/SubscriptionsPage";
import CustomerSupport from "./components/CustomerSupport/CustomerSupport";
import "./App.css";

function AppWrapper() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setSelectedCategory={setSelectedCategory}
      />

      <Sidebar
        darkMode={darkMode}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        navigate={navigate}
      />

      <div className={`page-wrapper ${isSidebarOpen ? "shift" : ""}`}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                darkMode={darkMode}
                isSidebarOpen={isSidebarOpen}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            }
          />
          <Route path="/search/:query" element={<SearchResults darkMode={darkMode} />} />
          <Route path="/video/:id" element={<VideoDetail darkMode={darkMode} />} />
          <Route path="/channel/:id" element={<ChannelDetail darkMode={darkMode} />} />
          <Route path="/history" element={<WatchHistory darkMode={darkMode} />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
        </Routes>
      </div>

      <CustomerSupport />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

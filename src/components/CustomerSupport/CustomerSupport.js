import React, { useState, useEffect } from "react";
import "./CustomerSupport.css";

function CustomerSupport() {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <button
        className={`support-icon ${animate ? "bounce-in" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <img src="/developer.jpg" alt="Developer" className="dev-icon" />
      </button>

      {open && (
        <div className="support-modal">
          <button className="close-support" onClick={() => setOpen(false)}>
            ✕
          </button>
          <div className="support-content">
            <img src="/developer.jpg" alt="Developer" className="profile-photo" />
            <h4 className="dev-name">Sai Chandan Gundaboina</h4>
            <p className="dev-role">Full Stack Developer</p>
            <div className="dev-links">
              <a href="https://github.com/Saichandanyadav" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/saichandanyadav/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a href="mailto:saichandhanyadav2002@gmail.com@gmail.com">Email</a>
            </div>
            <div className="project-section">
              <p>Want to know about the project explanation?</p>
              <button className="watch-btn" onClick={() => setVideoOpen(true)}>
                Watch on YouTube
              </button>
            </div>
          </div>
        </div>
      )}

      {videoOpen && (
        <div className="video-modal">
          <div className="video-content">
            <button className="close-video" onClick={() => setVideoOpen(false)}>
              ✕
            </button>
            <h3>Project Explanation</h3>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/rtUz6s-It7k?autoplay=1&mute=1"
              title="Project Explanation"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <button
              className="watch-btn"
              onClick={() =>
                window.open("https://www.youtube.com/@saichandanyadav/videos", "_blank")
              }
            >
              Follow me on YouTube
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CustomerSupport;

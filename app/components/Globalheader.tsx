"use client";

import Link from "next/link";
import { useLoginModal } from "../hooks/useLoginModal";
import { useState, useEffect } from "react";
import "./GlobalHeader.css";

export default function GlobalHeader() {
  const loginModal = useLoginModal();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in by checking localStorage
    const userID = localStorage.getItem('userID');
    setIsLoggedIn(!!userID);
  }, []);

  const handleAnnotateClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent navigation
      loginModal.open(); // Open login modal instead
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="icon">🖥️</span>
        <span className="nav-title">CeLT lab</span>
      </div>
      <div className="navbar-right">
        <Link href="/">Home</Link>
        <Link 
          href="/annotate" 
          onClick={handleAnnotateClick}
          className={!isLoggedIn ? "disabled-link" : ""}
        >
          Annotate
        </Link>
        <Link href="/about">About</Link>
        <button onClick={loginModal.open} className="nav-login-btn">
          Login
        </button>
      </div>
    </nav>
  );
}

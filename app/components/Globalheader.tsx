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

  // Listen for storage changes to update login state when user logs in
  useEffect(() => {
    const handleStorageChange = () => {
      const userID = localStorage.getItem('userID');
      setIsLoggedIn(!!userID);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab login)
    window.addEventListener('userLogin', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleStorageChange);
    };
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

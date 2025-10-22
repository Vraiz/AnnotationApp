"use client";

import Link from "next/link";
import { useLoginModal } from "../hooks/useLoginModal";
import { useState, useEffect } from "react";
import "./GlobalHeader.css";
import { Router } from "next/router";
import { useRouter } from 'next/navigation'

export default function GlobalHeader() {
  const loginModal = useLoginModal();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in by checking localStorage
    const userID = localStorage.getItem('userID');
    setIsLoggedIn(!!userID);

    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => setIsLoggedIn(true);

    window.addEventListener('userLogin', handleLogin);
    window.addEventListener('userLogout', handleLogout);
  }, []);

  const router = useRouter();

  const handleAnnotateClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent navigation
      loginModal.open(); // Open login modal instead
    }
  };

  const logout = async () => {
    localStorage.removeItem('userID')
    setIsLoggedIn(false)
    window.dispatchEvent(new CustomEvent('userLogout'));
    router.push('/')
    window.location.reload();
  }

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
        <button onClick={!isLoggedIn ? loginModal.open : logout} className="nav-login-btn">
          {!isLoggedIn ? "Login" : "Logout"}
        </button>
      </div>
    </nav>
  );
}

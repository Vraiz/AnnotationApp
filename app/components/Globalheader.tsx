"use client";

import Link from "next/link";
import { useLoginModal } from "../hooks/useLoginModal";
import "./GlobalHeader.css";

export default function GlobalHeader() {
  const loginModal = useLoginModal();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="icon">❓</span>
        <span className="nav-title">CeLT lab</span>
      </div>
      <div className="navbar-right">
        <Link href="/">Home</Link>
        <Link href="/annotate">Annotate</Link>
        <Link href="/about">About</Link>
        <button onClick={loginModal.open} className="nav-login-btn">
          Login
        </button>
      </div>
    </nav>
  );
}

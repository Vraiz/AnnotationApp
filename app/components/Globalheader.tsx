'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import styles from "../page.module.css";

const globalHeader = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        if(userID) {
            setIsLoggedIn(true);
            fetchUser(userID);
        }
    }, [])

    async function fetchUser(userID: string) {
        try {
            const res = await fetch(`/api/user?id=${userID}`);
            const data = await res.json();
            if (data.users) {
                setUsername(data.users.username || 'User');
        }
        } catch (err) {
            console.error('Error fetching user:', err);
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setUsername('');
        router.push('/');
    };

    const handleLogin = () => {
        router.push('/Login');
    }

    const handleRegister = () => {
        router.push('/Register');
    }

    return (
        <header className={styles.navbar}>
        <div className={styles.logo}>Home</div>

        <nav className={styles.navLinks}>
        <a href = "/">Home</a>
          <a href="#">Consent Form</a>
          <a href="#">Contact</a>
          <a href="#">About</a>
        </nav>

        <div className={styles.authButtons}>
          <button type = "button" className={styles.btnOutline} onClick={handleLogin}>Sign in</button>
          <button className={styles.btnDark} onClick={handleRegister}>Register</button>
        </div>
      </header>
    )
}

export default globalHeader
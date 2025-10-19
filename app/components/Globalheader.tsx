'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";

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

    return (
        <div id = "global_header">
            <div id = "header_subset">
                <div>
                    <a href = "/">Home</a>
                </div> 
                <div>
                    {isLoggedIn ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <button onClick={handleLogin}>Login</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default globalHeader
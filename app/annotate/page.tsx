'use client'
import Link from "next/link";
import Image from "next/image";
import react, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { skip } from "node:test";
import "./annotate.css";
import TweetAnnotation from "../components/TweetAnnotation";
import Toast from "../components/Toast";

const AnnotationPage = () => {
    const router = useRouter();
    const [score, setScore] = useState("")
    const [userData, setData] = useState<any>({})
    const [tweet, setTweet] = useState<any>({})
    const [progress, setProgress] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [isBlurred, setIsBlurred] = useState(false)

    useEffect(() => {
        console.log(localStorage.getItem('userID'))
        const userID = localStorage.getItem('userID')
        if (userID == null) {
            setIsBlurred(true)
            setShowToast(true)
            setTimeout(() => {
                router.push('/')
            }, 3000) 
        } else {
            try {
                fetchUser(userID)
                fetchTweet()
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }, []);

    async function fetchUser(userID: string) {
        const userResponse = await fetch("/api/user?id=" + userID)
        const finalData = await userResponse.json()
        console.log(finalData.users)
        if (finalData.users == null){
            alert("something went wrong")
            router.push('/')
        }
        setData(finalData.users)
        const initialCount = typeof finalData.users?.label_Count === 'number' ? finalData.users.label_Count : 0
        setProgress(initialCount % 100)
    }

    async function fetchTweet() {
        const tweetResponse = await fetch("/api/tweet")
        const finalTweet = await tweetResponse.json()
        setTweet(finalTweet.tweets)
    }

    const skip = async () => {
        fetchTweet()
    }

    const loadTweet = async () => {
        if (score === "") {
            alert("please select a rating")
        } else {
            const userID = localStorage.getItem('userID')
            if (userID) {
                setIsAnimating(true)
                
                await fetch("/api/tweet", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: tweet._id,
                        newLabel: parseInt(score)
                    }),
                })

                await fetch("/api/user", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: userID
                    }),
                })

                const newProgress = (userData.label_Count % 100) + 1
                setProgress(newProgress)
                
                fetchUser(userID)
                fetchTweet()
                setScore("")
                
                setTimeout(() => setIsAnimating(false), 1000)
            }
        }
    }

    return (
        <>
            {/* Toast notification - outside of blurred content */}
            {showToast && (
                <Toast 
                    message="You need to login first" 
                    type="error" 
                    onClose={() => setShowToast(false)}
                />
            )}

            {/* Blur overlay - separate from main content */}
            {isBlurred && (
                <div className="blur-overlay">
                    <div className="blur-content">
                        <h2>Access Denied</h2>
                        <p>Please log in to access the annotation page</p>
                        <div className="loading-spinner"></div>
                    </div>
                </div>
            )}

            {/* Main content - this gets blurred */}
            <div className={`annotation-page ${isBlurred ? 'annotation-page--blurred' : ''}`}>
                <div className="progress-container">
                    <div className="progress-bar">
                        <div 
                            className={`progress-fill ${isAnimating ? 'progress-animating' : ''}`}
                            style={{ width: `${(progress / 100) * 100}%` }}
                        ></div>
                    </div>
                    <div className="progress-text">
                        {progress}/100 tweets annotated
                    </div>
                </div>

                <div className="tweet-container">
                    <TweetAnnotation tweetText={tweet.content} />
                </div>

                <h4>Please rate this tweet based on the positivity/negativity of it's tone.</h4>
                <div className = "annotation-rating">
                    {[
                        {value: "1", label: "Very Negative"},
                        {value: "2", label: "Negative"},
                        {value: "3", label: "Somewhat Negative"},
                        {value: "4", label: "Neutral"},
                        {value: "5", label: "Somewhat Positive"},
                        {value: "6", label: "Positive"},
                        {value: "7", label: "Very Positive"},
                    ].map((option) => (
                        <label key={option.value} className="rating-option">
                            <input type = "radio" name = "rating" value = {option.value} checked = {score===option.value} onChange={(e) => setScore(e.target.value)}/>
                            {option.label}
                        </label>
                    ))}
                </div>
                <div className="annotation-progress">
                    Progress: {progress}/100
                </div>
                <div className="annotation-buttons">
                    <button className="annotation-btn annotation-btn--primary" onClick={loadTweet}>next</button>
                    <button className="annotation-btn annotation-btn--secondary" onClick={skip}>skip</button>
                </div>
            </div>
        </>
    );
}

export default AnnotationPage

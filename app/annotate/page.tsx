'use client'
import Link from "next/link";
import Image from "next/image";
import react, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { skip } from "node:test";
import "./annotate.css";

const AnnotationPage = () => {
    const router = useRouter();

    useEffect(() => {
        console.log(localStorage.getItem('userID'))
        const userID = localStorage.getItem('userID')
        if (userID == null) {
            router.push('/')
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
            //localStorage.clear()
            router.push('/')
        }
        setData(finalData.users)
    }

    async function fetchTweet() {
        const tweetResponse = await fetch("/api/tweet")
        const finalTweet = await tweetResponse.json()
        setTweet(finalTweet.tweets)
    }

    const [score, setScore] = useState("")
    const [userData, setData] = useState<any>({})
    const [tweet, setTweet] = useState<any>({})

    const skip = async () => {
        fetchTweet()
    }

    const loadTweet = async () => {
        if (score === "") {
            alert("please select a rating")
        } else {
            const userID = localStorage.getItem('userID')
            if (userID) {
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

                fetchUser(userID)
                fetchTweet()
                setScore("")
            }
        }
    }

    return (
        <div className='annotation-page'>
            <div className = "annotation-card">
                <div className = "annotation-avatar"></div>
                <div className = "annotation-content">
                    <div className = "annotation-header">
                        <span className = "annotation-name">Anonymous</span>
                        <span className = "annotation-handle">@Anonymous</span>
                        <span className = "annotation-date">Month DD</span>
                    </div>
                    <div id="tweetHolder">{tweet.content}</div>
                </div>
            </div>
            <h3>Please rate this tweet based on the positivity/negativity of it's tone.</h3>
            <h3>Click one of the circles to select the rating and press the next button to submit and move to the next tweet</h3>
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
                Progress: {userData.label_Count % 100 || null}/100
            </div>
            <div className="annotation-buttons">
                <button className="annotation-btn annotation-btn--primary" onClick={loadTweet}>next</button>
                <button id="annotation-btn annotation-btn--primary" onClick={skip}>skip</button>
            </div>
        </div>
    );
}

export default AnnotationPage

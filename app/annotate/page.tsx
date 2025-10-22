'use client'
import Link from "next/link";
import Image from "next/image";
import react, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";

const AnnotationPage = () => {
    const router = useRouter();

    useEffect(() => {
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

    const loadTweet = async () => {
        if (score === "") {
            alert("please select a rating")
        } else {
            const userID = localStorage.getItem('userID')
            if (userID) {
                try {
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

                } catch (e) {
                    alert("something went wrong")
                }
                fetchUser(userID)
                fetchTweet()
                setScore("") // ✅ this now unchecks all radios
            }
        }
    }

    return (
        <div id='quiz_main'>
            <div>
                <div id="tweet">{tweet.content}</div>
                <div id="holder">
                    <h3 id="legend">1=Very Negative, 3=Neutral, 5=Very Positive</h3>
                    <div id="likert">
                        <ul id="likert">
                            <li> Negative </li>
                            <li>
                                <input
                                    type="radio"
                                    name="rating"
                                    value="1"
                                    checked={score === "1"}
                                    onChange={(e) => setScore(e.target.value)}
                                />
                            </li>
                            <li>
                                <input
                                    type="radio"
                                    name="rating"
                                    value="2"
                                    checked={score === "2"}
                                    onChange={(e) => setScore(e.target.value)}
                                />
                            </li>
                            <li>
                                <input
                                    type="radio"
                                    name="rating"
                                    value="3"
                                    checked={score === "3"}
                                    onChange={(e) => setScore(e.target.value)}
                                />
                            </li>
                            <li>
                                <input
                                    type="radio"
                                    name="rating"
                                    value="4"
                                    checked={score === "4"}
                                    onChange={(e) => setScore(e.target.value)}
                                />
                            </li>
                            <li>
                                <input
                                    type="radio"
                                    name="rating"
                                    value="5"
                                    checked={score === "5"}
                                    onChange={(e) => setScore(e.target.value)}
                                />
                            </li>
                            <li> Positive </li>
                        </ul>
                    </div>
                </div>
                <div id="tweet">
                    <button onClick={loadTweet}>next</button>
                </div>
                <div id="tweet">
                    <h3 id="legend">{userData.label_Count % 100}/100</h3>
                </div>
            </div>
        </div>
    );
}

export default AnnotationPage

'use client'
import Link from "next/link";
import Image from "next/image";
import react, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { skip } from "node:test";

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
        <div id='quiz_main'>
                <h3>Please rate this tweet based on the positivity/negativity of it's tone.</h3>
                <h3>Click one of the circles to select the rating and press the next button to submit and move to the next tweet</h3>
                <div id="tweetHolder">{tweet.content}</div>
                <div id="holder">
                    <div id="likert">
                        <ul id="likert">
                            <li>
                                <input
                                    id="choice"
                                    type="radio"
                                    name="rating"
                                    value="1"
                                    checked={score === "1"}
                                    onChange={(e) => setScore(e.target.value)}
                                />
                                <h5>Very negative</h5>
                            </li>
                            <li>
                                <input
                                    id="choice"
                                    type="radio"
                                    name="rating"
                                    value="2"
                                    checked={score === "2"}
                                    onChange={(e) => setScore(e.target.value)}
                                />
                                <h5>Negative</h5>
                            </li>
                            <li>
                                <input
                                    id="choice"
                                    type="radio"
                                    name="rating"
                                    value="3"
                                    checked={score === "3"}
                                    onChange={(e) => setScore(e.target.value)}
                                />
                                <h5>Somewhat negative</h5>
                            </li>
                            <li>
                                <input
                                    id="choice"
                                    type="radio"
                                    name="rating"
                                    value="4"
                                    checked={score === "4"}
                                    onChange={(e) => setScore(e.target.value)}
                                />
                                <h5>Neutral</h5>
                            </li>
                            <li>
                                <input
                                    id="choice"
                                    type="radio"
                                    name="rating"
                                    value="5"
                                    checked={score === "5"}
                                    onChange={(e) => setScore(e.target.value)}
                                />
                                <h5>Somewhat postitive</h5>
                            </li>
                             <li>
                                <input
                                    id="choice"
                                    type="radio"
                                    name="rating"
                                    value="6"
                                    checked={score === "6"}
                                    onChange={(e) => setScore(e.target.value)}
                                />
                                <h5>Postitive</h5>
                            </li>
                            <li>
                                <input
                                    id="choice"
                                    type="radio"
                                    name="rating"
                                    value="7"
                                    checked={score === "7"}
                                    onChange={(e) => setScore(e.target.value)}
                                />
                                <h5>Very positive</h5>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="tweet">
                    <button id="nextButton" onClick={loadTweet}>next</button>
                    <button id="nextButton" onClick={skip}>skip</button>
                </div>
                <div id="tweet">
                    <h3 id="legend">{userData.label_Count % 100 || null}/100</h3>
                </div>
        </div>
    );
}

export default AnnotationPage

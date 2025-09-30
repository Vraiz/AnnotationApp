'use client'
import Link from "next/link";
import Image from "next/image";
import react, { useState } from 'react'

const AnnotationPage = () => {

    const [score, setScore] = useState("")
    const [item, setItem] = useState(0)

    const loadTweet = () => {
        console.log(score)
        if(score!=""){
            setItem(item + 1)
        }
    }

    return (
        <div id='quiz_main'>
            <div>
                <div id="tweet">Test Tweet</div>
                <div id="holder"> 
                    <h3 id="legend">1=Very Negative, 3=Neutral, 5=Very Positive</h3>
                    <div id="likert">
                        <ul  id="likert">
                            <li> Negative </li>
                            <li><input id="option" type="radio" name="1" value="1" onChange={(e) => setScore(e.target.value)} /></li>
                            <li><input id="option" type="radio" name="1" value="2" onChange={(e) => setScore(e.target.value)}/></li>
                            <li><input id="option" type="radio" name="1" value="3" onChange={(e) => setScore(e.target.value)}/></li>
                            <li><input id="option" type="radio" name="1" value="4" onChange={(e) => setScore(e.target.value)}/></li>
                            <li><input id="option" type="radio" name="1" value="5" onChange={(e) => setScore(e.target.value)}/></li>
                            <li id="option"> Positive </li>
                        </ul>
                    </div>
                </div>
                <div id="tweet"><button onClick={loadTweet}>next</button></div>
                <div id="tweet"><h3 id="legend">{item}/100</h3></div>
            </div>
        </div>
    );
}

export default AnnotationPage
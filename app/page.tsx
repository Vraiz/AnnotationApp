'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter();

  const [linkValue, setLink] = useState("/Register")

  useEffect(() => {
  var userID = localStorage.getItem('userID');
  if(userID != null) {
      setLink('/annotate')
  }
  }, []);

  return (
    <main>
      <div id="home_main">
        <h1 id="welcome">Welcome</h1>
        <h3 id="home_text">You'll be helping us in developing a Emoji sentiment lexicon that is culturally adapted for the Filipino context.</h3>
        <h3 id="home_text">All you will need to do is to rate/annotate tweets that we will be showing based on how positive or negative it's tone. Incase you cannot rate it there is also an option to skip that tweet</h3>
        <h3 id="home_text">Pressing the start button will lead you to a login or register page where you will need to fill up some basic information once you have your account you will be redirected to the annotation page. if Ever you get disconnected or leave the website you're progress with annotation will be saved to your account.</h3>
        <Link href={linkValue}><button id="quiz_button" type="button">Start Annotating</button></Link>
        <h3 id="home_text">If you are willing to go ahead and understand Filipino thank you so much for participating in this project and if it's not too much to ask sharing this to other Filipino friends would be greatly appreciated.</h3>
        <h3 id="home_text">If there are any questions or problems with the site you may contact me at raileysingson@gmail.com</h3>
      </div>
      
    </main>
  );
}

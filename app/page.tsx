'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import TweetAnnotation from "./components/TweetAnnotation";
import RegisterModal from './components/RegisterModal'
import styles from './page.module.css';

export default function Home() {

    const [showRegister, setShowRegister] = useState(false)

    const router = useRouter();
    const [linkValue, setLink] = useState("/Login")

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        if (userID != null) {
        router.push('/annotate');
        }
    }, []);

    return (
    <main>
        <section className="content">
        <h1>Greetings!</h1>
        <p>
            We are 4th year DLSU students looking for <strong>particpants </strong>
            that can help us with our research titled:
            
            <br/><br/>
            <strong>
            "Developing a Culturally Adapted Emoji Sentiment Lexicon for the 
            Philippine Context: Creation, Application, and Comparative Analysis"
            </strong>{" "}
            <br/><br/>
            Developing Filipino NLP technologies and research helps to progress 
            understanding and further research into the Filipino language and improve related technologies 
            (i.e. chat bots, spam filters, and grammar checkers). As thanks for your efforts,<strong> a small monetary 
            compensation</strong> will be provided based on the amount of tweets annotated.
        </p>

        <p>
            Before starting the experiment, please make sure to read the following
            instructions carefully.
        </p>

        <h2>Instructions:</h2>
        <ol>
            <li>
                Click the "Get Started" button to register an account or log in if you already have one.
            </li>
            <li>
                Answer the consent form to proceed to the experiment. 
            </li>
            <TweetAnnotation tweetText="I can’t believe how fun this was! 😄" />
            <button className="sample-submit">
            Submit
            </button>
            <li>Annotate the tweet based on your own interpretation. Answers only range from Strongly Negative to Strongly Positive. If you are unsure, you can answer neutral.</li>
            <li>
                After submitting your annotation, you will be presented with a new tweet to annotate. 
                Continue annotating tweets until you decide to stop.
            </li>
            <li>
                There is a progress bar at the top right of the page to help you keep track of how many tweets you have annotated. There is an <strong>monetary incentive </strong> for
                completing a number of annotations.
            </li>
        </ol>
        <button className="btn-primary" onClick={() => setShowRegister(true)}>
            Get Started
        </button>
        <h2>About Our Research</h2>
        <p>
            We are 4th year students in De La Salle University researching Natural
            Language Processing (NLP) — specifically how Filipino social media
            shapes the sentiment of emojis. We aim to identify characteristic
            patterns and trends that define how Filipinos use emojis compared to
            users from other cultures and nations. This research contributes to
            the growing pool of Filipino NLP resources.
        </p>

        <h2>Why Participate in Our Research</h2>
        <p>
            Contributing to our research in Filipino Natural Language Processing
            (NLP) helps open new opportunities for further research and technology
            development. Advancing Filipino NLP supports better understanding and
            applications in the Filipino language — including chatbots, spam
            filters, and grammar checkers. As a token of appreciation,
            participants will receive small monetary compensation based on the
            number of tweets annotated.
        </p>
        </section>

        {/* Modals */}
        {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </main>
  );
}

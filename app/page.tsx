'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import TweetAnnotation from "./components/TweetAnnotation";
import RegisterModal from './components/RegisterModal'
import styles from './page.module.css';

export default function Home() {

    const [showRegister, setShowRegister] = useState(false)
    const [sentiment, setSentiment] = useState("")
    const [tweet, setTweet] = useState<any>({})

    const router = useRouter();
    const [linkValue, setLink] = useState("/Login")
    const [status, setStatus] = useState(false)

    const handleSentimentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSentiment(e.target.value);
    };

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        if (userID!= null){
          setStatus(true)
        }
    }, []);

    const register = async () => {
    
      if(status){
        router.push("/annotate")
      }else{
        setShowRegister(true)
      }
    }


    const fetchTweet = async () => {
        const tweetResponse = await fetch("/api/tweet")
        const finalTweet = await tweetResponse.json()
        setTweet(finalTweet.tweets)
    }

    return (
    <main>
        <section className="content">
        <h1>❗Greetings❗</h1>
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
                Click the <strong>"Get Started"</strong> button to register an account or log in if you already have one.
            </li>
            <li>
                After registering, read and answer the <strong>consent form </strong>to proceed to the experiment. 
            </li>
            <TweetAnnotation tweetText={tweet.content} />
            <div className={styles.surveySection}>
            <h4>Please rate this tweet based on the positivity/negativity of it's tone:</h4>
            <div className={styles.radioGroup}>
                {[
                    "Strongly Negative",
                    "Negative",
                    "Neutral",
                    "Positive",
                    "Strongly Positive",
                ].map((label) => (
                    <label key={label} className={styles.radioLabel}>
                    <input
                        type="radio"
                        name="sentiment"
                        value={label}
                        checked={sentiment === label}
                        onChange={handleSentimentChange}
                    />
                    {label}
                    </label>
                ))}
                </div>
            </div>
            <div className="sample-buttons">
            <button className="sample-skip" onClick={fetchTweet}>
            skip
            </button>
            <button className="sample-submit" onClick={fetchTweet}>
            next
            </button>
            </div>
            <li>Annotate the tweet based on your own interpretation. Answers only range from strongly negative to strongly positive. If you are unsure, you can skip.</li>
            <li>
                After submitting your annotation, you will be presented with a new tweet to annotate. 
                Continue annotating tweets until you decide to stop.
            </li>
            <li>
                There is a progress bar at the top of the page to help you keep track of how many tweets you have annotated. There is an <strong>monetary incentive </strong> for
                completing <strong>100 annotations.</strong>
            </li>
            <li>
                Tweets <strong>_USER_</strong> or <strong>_LINK_</strong> had the user/link redacted for privacy and safety reasons
            </li>
        </ol>
        <button className="btn-primary" onClick={register}>
            Get Started
        </button>
        <h2>About Our Research</h2>
        <p>
            We are 4th year students in De La Salle University researching Natural
            Language Processing (NLP) specifically how Filipino social media
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
            applications in the Filipino language including chatbots, spam
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

'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import styles from './page.module.css';

export default function Home() {

  const router = useRouter();

  const [linkValue, setLink] = useState("/Login")

  return (
    <>

      {/* Hero Section */}
      <main className={styles.hero}>
      <section className={styles.heroLeft}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>Emoji Annotation</h1>
          <p className={styles.heroSubtitle}>Help us annotate emojis for Filipino NLP</p>
        </div>

        <div className={styles.heroButtons}>
          <button className={styles.btnOutline} onClick = {() => {router.push("/Login")}}>
            ⭐ Get Started
          </button>
        </div>
      </section>

      <section className={styles.heroRight}>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h1 className={styles.heroTitle}>Hello!</h1>
          <img src="/laugh.png" alt="Emoji" className={styles.heroImage} />
        </div>

        <div className={styles.radioGroup}>
          <label>
            <input type="radio" name="sentiment" /> Negative
          </label>
          <label>
            <input type="radio" name="sentiment" /> Neutral
          </label>
          <label>
            <input type="radio" name="sentiment" /> Positive
          </label>
        </div>
      </section>
    </main>



      {/* Research Section */}
      <section className={styles.researchSection}>
      <div className={styles.researchLeft}>
        <h2 className={styles.researchHeading}>Why Participate in Our Research?</h2>
        <h3 className={styles.researchSubheading}>
          Anyone with Filipino citizenship in the Philippines can join!
        </h3>
        <p className={styles.researchText}>
          Contributing to our research in Filipino Natural Language Processing (NLP) 
	        can help open opportunities into further research and technologies.
        </p>
        <p className={styles.researchText}>
          By joining, you’ll help develop technology that better understands Filipino
          language, emotions, and communication styles — improving chatbots,
          sentiment analysis, and more.
        </p>
      </div>

      <div className={styles.researchRight}>
        <img
          src="/think.png"
          alt="Research illustration"
          className={styles.researchImage}
        />
      </div>
    </section>


    <section className={styles.researchSection}>
      <div className={`${styles.researchRow} ${styles.reverse}`}>
        <div className={styles.textBlock}>
          <h2>About our Research</h2>
          <p className={styles.subtext}>We are 4th year students in DLSU</p>
          <p>
            We are researching NLP specifically how the Filipino social media shapes the sentiment of 
            emojis. We are interested in finding the characteristics patterns and trends that differ how 
            Filipinos use emojis compared to how users from different cultures and nations use them. 
            This research also seeks to contribute to the growing pool of Filipino NLP resources.
          </p>
        </div>

        <div className={styles.imagePlaceholder}></div>
      </div>
    </section>



    <section className={styles.meetResearchers}>
      <h2>Meet the Researchers</h2>
      <p className={styles.subtext}>from DLSU</p>

      <div className={styles.researcherGrid}>
        <div className={styles.researcherCard}>
          <div className={styles.imagePlaceholder}></div>
          <div>
            <h3>Adi Miranda</h3>
            <p>Body text for whatever you'd like to say.</p>
          </div>
        </div>

        <div className={styles.researcherCard}>
          <div className={styles.imagePlaceholder}></div>
          <div>
            <h3>Ron Cajumban</h3>
            <p>Body text for whatever you'd like to say.</p>
          </div>
        </div>

        <div className={styles.researcherCard}>
          <div className={styles.imagePlaceholder}></div>
          <div>
            <h3>Railey Singson</h3>
            <p>Body text for whatever you'd like to say.</p>
          </div>
        </div>

        <div className={styles.researcherCard}>
          <div className={styles.imagePlaceholder}></div>
          <div>
            <h3>Isaac Javid</h3>
            <p>
              4th year college student studying 
              computer science in De La Salle 
              University. 
            </p>
            <br></br>
            <p>
              Email: isaac_javid@dlsu.edu.ph
            </p>
          </div>
        </div>

        <div className={styles.researcherCard}>
          <div className={styles.imagePlaceholder}></div>
          <div>
            <h3>Ed Tighe</h3>
            <p>Body text for whatever you'd like to say.</p>
          </div>
        </div>
      </div>
    </section>

    </>
  );
}

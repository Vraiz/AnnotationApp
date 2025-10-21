'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import styles from './page.module.css';

export default function Home() {

  const router = useRouter();

  const [linkValue, setLink] = useState("/Login")

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    if (userID != null) {
      router.push('/annotate');
    }
  }, []);

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
        <img
          src="/laugh.png"
          alt="Emoji"
          className={styles.heroImage}
        />

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
          Anyone with Filipino citizenship can join!
        </h3>
        <p className={styles.researchText}>
          Our research focuses on annotating emojis to make Filipino Natural
          Language Processing (NLP) more accurate and culturally aware.
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
            Body text for your whole article or post. We’ll put in some lorem ipsum to show
            how a filled-out page might look:
          </p>
          <p>
            Excetupeur efficient emerging, minim veniam anim aute carefully curated Ginza
            conversation exquisite perfect nostrud nisi intricate content.
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
            <p>Body text for whatever you'd like to say.</p>
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

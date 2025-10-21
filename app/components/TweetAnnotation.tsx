"use client";
import React, { useState } from "react";
import styles from "./TweetAnnotation.module.css";

interface TweetAnnotationProps {
  tweetText?: string;
}

const TweetAnnotation: React.FC<TweetAnnotationProps> = ({
  tweetText = "This is a sample tweet with emojis 😊🔥",
}) => {
  const [sentiment, setSentiment] = useState("");

  const handleSentimentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSentiment(e.target.value);
  };

  return (
    <>
    <div className={styles.tweetCard}>
      <div className={styles.tweetHeader}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="Profile"
          className={styles.tweetAvatar}
        />
        <div className={styles.tweetUser}>
          <strong>Anonymous</strong> <span>@anonymous</span>
        </div>
      </div>

      <p className={styles.tweetContent}>{tweetText}</p>
    </div>
    <br/>
    <div className={styles.surveySection}>
    <h4>Please rate the tweet based on the possible emotions of the user:</h4>
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
  </>
  );
};

export default TweetAnnotation;

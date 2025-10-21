"use client";
import styles from "./TweetAnnotation.module.css";

interface TweetAnnotationProps {
  tweetText?: string;
}

const TweetAnnotation: React.FC<TweetAnnotationProps> = ({
  tweetText = "This is a sample tweet with emojis 😊🔥",
}) => {
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
  </>
  );
};

export default TweetAnnotation;

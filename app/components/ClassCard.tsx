// ClassCard.jsx
import { useState } from "react";
import styles from "./ClassCard.module.css";
import { IconClock, IconCalendarEvent } from "@tabler/icons-react";

const ClassCard = ({ className, time, duration, spotsLeft }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleBookClick = () => {
    setShowDetails(true);
  };

  return (
    <div className={styles.card}>
      <div className={styles.details}>
        <h4>{className}</h4>
        <div className={styles.time}>
          <IconCalendarEvent size={16} /> {time}
        </div>
        <div className={styles.duration}>
          <IconClock size={16} /> {duration}
        </div>
        <div className={styles.spotsLeft}>{spotsLeft} spots left</div>
      </div>
      <button className={styles.bookButton} onClick={handleBookClick}>
        Book
      </button>

      {showDetails && (
        <div className={styles.extraInfo}>
          <p>Directions: [Provide Directions]</p>
          <p>Preparation: [Preparation details]</p>
        </div>
      )}
    </div>
  );
};

export default ClassCard;

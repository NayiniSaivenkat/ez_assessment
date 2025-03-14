import React from 'react';
import styles from "./Card.module.css";

const Card = ({img,text}) => {
  return (
    <div className={styles.card}>
        <div className={styles.cardHeader}>
            <img src={img} alt={text} />
            <h4>{text}</h4>
        </div>
        <p>Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet</p>
    </div>
  )
}

export default Card
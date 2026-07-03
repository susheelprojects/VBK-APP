"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./HomeSlider.module.css";

const slides = [
  { src: "/home/slider1.jpg" },
  { src: "/home/slider2.jpg" },
  { src: "/home/slider3.jpg" },
  { src: "/home/slider4.jpg" },
  { src: "/home/slider5.jpg" },
  { src: "/home/slider6.jpg" },
  { src: "/home/slider7.jpg" },
  { src: "/home/slider8.jpg" },
  { src: "/home/slider9.jpg" },
];

export default function HomeSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.sliderContainer}>
      <img src={slides[index].src} className={styles.sliderImage} />

      <button className={styles.leftArrow} onClick={() => setIndex((index - 1 + slides.length) % slides.length)}>❮</button>
      <button className={styles.rightArrow} onClick={() => setIndex((index + 1) % slides.length)}>❯</button>

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === index ? styles.activeDot : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link"; // ⭐ REQUIRED for routing
import styles from "./Header.module.css";

interface HeaderProps {
  leftImages?: string[];
  rightImages?: string[];
  logo?: string;
  name?: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({
  leftImages = [],
  rightImages = [],
  logo,
  name = "Bhujunder Kumar Veeraboina",
  subtitle = ""
}) => {
  return (
    <header className={styles.headerContainer}>
      
      {/* Left Images */}
      <div className={styles.imageGroup}>
        {leftImages.slice(0, 3).map((img, index) => (
          <img key={index} src={img} alt="left" className={styles.circleImg} />
        ))}
      </div>

      {/* Center Logo + Name + Navigation */}
      <div className={styles.centerSection}>
        <div className={styles.branding}>
          {logo && <img src={logo} alt="logo" className={styles.logoImg} />}
          <h1 className={styles.brandName}>{name}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        {/* ⭐ FIXED NAVIGATION */}
        <nav className={styles.navMenu}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/press">Press</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>

      {/* Right Images */}
      <div className={styles.imageGroup}>
        {rightImages.slice(0, 3).map((img, index) => (
          <img key={index} src={img} alt="right" className={styles.circleImg} />
        ))}
      </div>
    </header>
  );
};

export default Header;

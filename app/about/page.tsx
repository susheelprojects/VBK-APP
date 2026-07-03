import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <main className={styles.aboutContainer}>
      <section className={styles.bioSection}>
        {/* LEFT COLUMN — TEXT */}
        <div className={styles.bioText}>
          <h1 className={styles.title}>
            Bhujunder Kumar Veeraboina : An Introduction
          </h1>
          <p>
            Bhujunder Kumar Veeraboina, a dedicated leader and social worker,
            has been serving communities with unwavering commitment since 1989.
            His journey began in grassroots development, focusing on youth
            empowerment, education, and public service. Over the years, he has
            become known for his integrity, compassion, and leadership that
            inspires collective progress.
          </p>
          <p>
            His early life was shaped by strong family values and a deep sense
            of responsibility toward society. Through his work, he continues to
            promote leadership, service, community, and vision — the four
            pillars that define his mission.
          </p>
          <p>
            Bhujunder’s initiatives have touched thousands of lives, from
            organizing welfare programs to mentoring young leaders. His
            dedication to social harmony and development remains a guiding force
            for those who believe in building a better tomorrow.
          </p>
        </div>

        {/* RIGHT COLUMN — IMAGE */}
        <div className={styles.bioImageContainer}>
          <img
            src="/home/about.jpg"
            alt="Bhujunder Kumar Veeraboina"
            className={styles.bioImage}
          />
        </div>
      </section>

      {/* SOCIAL ICONS */}
      <div className={styles.socialIcons}>
        <a href="#" aria-label="Facebook">🌐</a>
        <a href="#" aria-label="Twitter">🐦</a>
        <a href="#" aria-label="Instagram">📸</a>
        <a href="#" aria-label="YouTube">▶️</a>
      </div>
    </main>
  );
}

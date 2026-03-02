"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const featuredSurahs = [
  { number: 1, name: "Al-Fatihah", arabic: "الفاتحة", verses: 7, meaning: "The Opening" },
  { number: 2, name: "Al-Baqarah", arabic: "البقرة", verses: 286, meaning: "The Cow" },
  { number: 3, name: "Al-Imran", arabic: "آل عمران", verses: 200, meaning: "Family of Imran" },
  { number: 36, name: "Ya-Sin", arabic: "يس", verses: 83, meaning: "Ya Sin" },
  { number: 55, name: "Ar-Rahman", arabic: "الرحمن", verses: 78, meaning: "The Most Gracious" },
  { number: 112, name: "Al-Ikhlas", arabic: "الإخلاص", verses: 4, meaning: "Sincerity" },
];

export default function Home() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("quran-theme");
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("quran-theme", next);
  };

  const isLight = theme === "light";

  return (
    <div className={`${styles.page} ${isLight ? styles.light : ""}`}>
      <nav className={styles.navbar}>
        <div className={styles.navInner}>
          <div className={styles.navBrand}>
            <span className={styles.navLogo}>☽</span>
            <span className={styles.navTitle}>Qur&apos;an</span>
          </div>
          <ul className={styles.navLinks}>
            <li><Link href="/" className={styles.navLink}>Home</Link></li>
            <li><a href="#" className={styles.navLink}>Surahs</a></li>
            <li><a href="#" className={styles.navLink}>Juz</a></li>
            <li><a href="#" className={styles.navLink}>Bookmarks</a></li>
            <li><a href="#" className={styles.navLink}>Settings</a></li>
          </ul>
          <div className={styles.navActions}>
            <div className={styles.navSearch}>
              <input
                type="text"
                placeholder="Search surah or verse..."
                className={styles.searchInput}
              />
            </div>
            <button
              onClick={toggleTheme}
              className={styles.themeToggle}
              aria-label="Toggle light/dark mode"
              title={isLight ? "Switch to dark mode" : "Switch to light mode"}
            >
              <span className={styles.themeToggleTrack}>
                <span className={`${styles.themeToggleThumb} ${isLight ? styles.thumbLight : ""}`} />
              </span>
              <span className={styles.themeToggleIcon}>
                {isLight ? "☀️" : "🌙"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.heroArabic}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <p className={styles.heroTranslation}>In the name of Allah, the Most Gracious, the Most Merciful</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Browse Surahs</h2>
          <div className={styles.surahGrid}>
            {featuredSurahs.map((surah) => (
              // ✅ Next Link, correct href
              <Link href={`/surah/${surah.number}`} key={surah.number} className={styles.surahCard}>
                <div className={styles.surahNumber}>{surah.number}</div>
                <div className={styles.surahInfo}>
                  <h3 className={styles.surahName}>{surah.name}</h3>
                  <p className={styles.surahMeaning}>{surah.meaning}</p>
                  <p className={styles.surahVerses}>{surah.verses} verses</p>
                </div>
                <div className={styles.surahArabic}>{surah.arabic}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Read, reflect, and recite. &nbsp;☽</p>
      </footer>
    </div>
  );
}
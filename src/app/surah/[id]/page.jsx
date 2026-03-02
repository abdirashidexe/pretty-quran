"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "./../../page.module.css";

export default function SurahPage() {
  const { id } = useParams();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/surah/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSurah(data.chapter);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load surah.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className={styles.state}>Loading...</div>;
  if (error)   return <div className={styles.state}>{error}</div>;

  return (
    <div className={styles.page}>
      <nav className={styles.navbar}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.backLink}>← Back</Link>
          <span className={styles.navTitle}>Surah {id}</span>
        </div>
      </nav>

      <main className={styles.main}>

        {/* Surah Header */}
        <section className={styles.hero}>
          <p className={styles.heroArabic}>{surah.name_arabic}</p>
          <h1 className={styles.surahTitle}>{surah.name_complex}</h1>
          <p className={styles.heroTranslation}>{surah.translated_name.name}</p>
          <div className={styles.surahMeta}>
            <span>{surah.verses_count} verses</span>
            <span>·</span>
            <span>{surah.revelation_place === "makkah" ? "Meccan" : "Medinan"}</span>
            <span>·</span>
            <span>Surah {surah.id}</span>
          </div>
        </section>

        {/* Verses Placeholder */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Verses</h2>
          <div className={styles.versesPlaceholder}>
            <p>Qur'an verses coming soon...</p>
          </div>
        </section>

      </main>

      <footer className={styles.footer}>
        <p>Read, reflect, and recite. &nbsp;☽</p>
      </footer>
    </div>
  );
}
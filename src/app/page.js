"use client";
import Link from "next/link";
import Header from "./components/Header.jsx";
import { useState, useEffect } from "react";

export default function Home() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/surahs`)
      .then((res) => res.json())
      .then((data) => {
        setSurahs(data.chapters);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <Header />
      <main className="main">
        <section className="hero">
          <p className="heroArabic">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <p className="heroTranslation">In the name of Allah, the Most Gracious, the Most Merciful</p>
        </section>
        <section className="section">
          <h2 className="sectionTitle">Browse Surahs</h2>
          {loading ? (
            <p style={{ color: 'var(--text-muted)' }}>Loading surahs...</p>
          ) : (
            <div className="surahGrid">
              {surahs.map((surah) => (
                <Link href={`/surah/${surah.id}`} key={surah.id} className="surahCard">
                  <div className="surahNumber">{surah.id}</div>
                  <div className="surahInfo">
                    <h3 className="surahName">{surah.name_simple}</h3>
                    <p className="surahMeaning">{surah.translated_name.name}</p>
                    <p className="surahVerses">{surah.verses_count} verses</p>
                  </div>
                  <div className="surahArabic">{surah.name_arabic}</div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <footer className="footer">
        <p>Read, reflect, and recite. &nbsp;☽</p>
      </footer>
    </div>
  );
}
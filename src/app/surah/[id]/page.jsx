"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "./../../components/Header";

export default function SurahPage() {
  const { id } = useParams();
  const [surah, setSurah] = useState(null);
  const [verses, setVerses] = useState([]);
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
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/surah/${id}/verses`)
      .then((res) => res.json())
      .then((data) => {
        setVerses(data.verses);
      })
      .catch((err) => setError("Failed to load verses."));
  }, [id]);

  if (loading) return <div className="state">Loading...</div>;
  if (error) return <div className="state">{error}</div>;

  return (
    <div className="page">
      <Header />
      <main className="main">
        <section className="hero">
          <p className="heroArabic">{surah.name_arabic}</p>
          <h1 className="surahTitle">{surah.name_complex}</h1>
          <p className="heroTranslation">{surah.translated_name.name}</p>
          <div className="surahMeta">
            <span>{surah.verses_count} verses</span>
            <span>·</span>
            <span>{surah.revelation_place === "makkah" ? "Meccan" : "Medinan"}</span>
            <span>·</span>
            <span>Surah {surah.id}</span>
          </div>
        </section>
        <section className="section">
          <h2 className="sectionTitle">Verses</h2>
          <div className="versesList">
            {verses.map((verse) => (
              <div key={verse.id} className="verseCard">
                <div className="verseNumber">{verse.verse_number}</div>
                <div className="verseContent">
                  <p className="verseArabic">
                    {verse.words.map((word) => word.text_uthmani).join(' ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>Read, reflect, and recite. &nbsp;☽</p>
      </footer>
    </div>
  );
}
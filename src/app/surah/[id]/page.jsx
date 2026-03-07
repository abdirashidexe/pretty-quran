"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "./../../components/Header";
import Footer from "@/app/components/Footer";
import { useTheme } from "@/app/context/ThemeContext";
import { eligibleRecitersIds2, eligibleRecitersIds } from "@/app/data/reciters";

export default function SurahPage() {
  const { id } = useParams();
  const [surah, setSurah] = useState(null);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme, isDark } = useTheme();
  const [audioSrc, setAudioSrc] = useState(null);
  const [reciterId, setReciterId] = useState(1)
  const [reciters, setReciters] = useState([]);
  const [selectedMushaf, setSelectedMushaf] = useState(0)

  function sortByName(myArray) {
    return myArray.sort((reciter1, reciter2) => reciter1.name.localeCompare(reciter2.name));
  }

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

  // EFFECT: Build audio URL whenever the selected reciter or surah changes  useEffect(() => {
  useEffect(() => {
    if (reciters.length === 0) return; // <- don't run until reciters are loaded

    const selectedReciter = reciters.find((reciter) => reciter.id === Number(reciterId)); // <- find the reciter the user picked from the reciters array already in state
    if (!selectedReciter) return;

    const userSelectedMushaf = selectedReciter.moshaf.find((mushaf) => mushaf.id === Number(selectedMushaf));
    if (!userSelectedMushaf) return;

    const serverUrl = userSelectedMushaf.server; // <- grab reciters server URL from mp3quran.net API link
    const paddedId = String(id).padStart(3, "0"); // <- turn "1" into "001", "24" into "024" etc.

    setAudioSrc(serverUrl + paddedId + ".mp3"); // <- build the full URL and set it
  }, [id, reciterId, reciters, selectedMushaf]);

  // EFFECT: Fetch full reciter list from backend once on mount  useEffect(() => {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reciters`)
      .then((res) => res.json())
      .then(data => {
        const sortedReciters = sortByName(data.reciters)
        const filteredReciters = sortedReciters.filter(reciter => eligibleRecitersIds2.includes(reciter.id))
        console.log(filteredReciters[0].moshaf)
        setReciters(filteredReciters)
        setReciterId(filteredReciters[0].id) // <- whoever is first alphabetically replaces default & becomes new default
        setSelectedMushaf(filteredReciters[0].moshaf[0].id)
      })
      .catch(() => setError("Failed to load reciters"));
  }, []);

  const selectedReciter = reciters.find(reciter => reciter.id === Number(reciterId))
  const moshafList = selectedReciter ? selectedReciter.moshaf : [];

  if (loading) return <div className="state">Loading...</div>;
  if (error) return <div className="state">{error}</div>;

  return (
    <div className={`page ${theme} ${isDark ? "" : "light"}`}>
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
        <section className="section" id="audio-section">
          <h2 className="sectionTitle">Audio</h2>
          <label for="reciters">🎙️ Reciter</label>
          <select name="reciters" onChange={(e) => {
            setReciterId(e.target.value);
            const newReciterSelected = reciters.find(reciter => reciter.id === Number(e.target.value));
            setSelectedMushaf(newReciterSelected.moshaf[0].id);
          }}
            value={reciterId}
            className="reciterSelect">
            {reciters.map((reciter) => (
              <option key={reciter.id} value={reciter.id} defaultValue={reciters[0]}>{eligibleRecitersIds.find(r => r.id === reciter.id).displayName}</option>
            ))}
          </select>
          <label label for="riwaayahs">📜 Riwaayah</label>
          <select name="riwaayahs" onChange={(e) =>
            setSelectedMushaf(e.target.value)}
            value={selectedMushaf}
            className="reciterSelect">
            {moshafList.map((riwayah) => (
              <option key={riwayah.id} value={riwayah.id} defaultValue={riwayah[0]}>{eligibleRecitersIds.find(r => r.id === selectedReciter.id).riwayat[riwayah.id]}</option>
            ))}
          </select>
          <audio controls src={audioSrc} className="audioPlayer"></audio>
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
      <Footer />
    </div>
  );
}
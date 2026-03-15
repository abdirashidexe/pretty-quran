"use client";
import { useState, useEffect } from "react";
import AllSurahs from "../components/AllSurahs";
import Header from "../components/Header";
import { useTheme } from "../context/ThemeContext";
import Footer from "../components/Footer";

export default function AllSurahsPage() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme, isDark } = useTheme();

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
    <>
      <div className={`page ${theme} ${isDark ? "" : "light"}`}>
        <Header />
        <AllSurahs surahs={surahs} loading={loading} />
        <Footer />
      </div>
    </>
  )
}
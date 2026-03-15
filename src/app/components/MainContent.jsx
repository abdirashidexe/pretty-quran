"use client";
import MainHero from "./MainHero";
import MainPopularSurahs from "./MainPopularSurahs";
import Link from "next/link";

export default function MainContent() {
  return (
    <main className="main">
      <MainHero />
      <MainPopularSurahs />
      <Link href="/surahs" className="btn" id="all-surahs-btn">Go to All Surahs</Link>
    </main>
  );
}
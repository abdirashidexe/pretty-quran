"use client";
import Header from "./components/Header.jsx";
import MainContent from "./components/MainContent.jsx";
import Footer from "./components/Footer.jsx";
import { useTheme } from "./context/ThemeContext.js"

export default function Home() {
  const { theme, isDark } = useTheme();

  return (
    <div className={`page ${theme} ${isDark ? "" : "light"}`}>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
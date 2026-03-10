"use client";
import Link from "next/link";
import { useTheme } from "./../context/ThemeContext"

export default function Header() {
  const { isDark, toggleDark } = useTheme();

  return (
    <nav className="navbar">
      <div className="navInner">
        <div className="navBrand">
          <a className="navLogo" href="https://www.qirayah.com">✧</a>
          <a className="navTitle" href="https://www.qirayah.com">Qirayah</a>
        </div>
        <ul className="navLinks">
          <li><Link href="/" className="navLink">Home</Link></li>
          <li><Link href="/surahs" className="navLink">Surahs</Link></li>
          <li><Link href="/juzs" className="navLink">Juz</Link></li>
          <li><Link href="/bookmarks" className="navLink">Bookmarks</Link></li>
          <li><Link href="/settings" className="navLink">Settings</Link></li>
        </ul>
        {/* <div className="navActions">
          <div className="navSearch">
            <input
              type="text"
              placeholder="Search surah or verse.. (coming soon)"
              className="searchInput"
            />
          </div>
        </div> */}
        <div>
          <button onClick={toggleDark} className="toggle-btn">{isDark ? "☀️" : "🌙"}</button>
        </div>
      </div>
    </nav>
  );
}
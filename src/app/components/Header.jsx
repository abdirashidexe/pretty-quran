"use client";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="navbar">
      <div className="navInner">
        <div className="navBrand">
          <span className="navLogo">☽</span>
          <span className="navTitle">Qur&apos;an</span>
        </div>
        <ul className="navLinks">
          <li><Link href="/" className="navLink">Home</Link></li>
          <li><a href="#" className="navLink">Surahs</a></li>
          <li><a href="#" className="navLink">Juz</a></li>
          <li><a href="#" className="navLink">Bookmarks</a></li>
          <li><a href="#" className="navLink">Settings</a></li>
        </ul>
        <div className="navActions">
          <div className="navSearch">
            <input
              type="text"
              placeholder="Search surah or verse..."
              className="searchInput"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
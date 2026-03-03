"use client"
import Header from "../components/Header"
import { useTheme } from "../context/ThemeContext"

export default function Bookmarks() {
    const { theme, isDark } = useTheme();

    return (
        <div className={`page ${theme} ${isDark ? "" : "light"}`}>
            <Header />
            <main className="main">
                <section className="section">
                    <h2 className="sectionTitle">Bookmarks</h2>
                    <div className="comingSoon">
                        <span className="comingSoonIcon">🔖</span>
                        <h3 className="comingSoonTitle">Bookmarks coming soon</h3>
                        <p className="comingSoonText">Save your favourite ayahs and surahs to revisit them anytime.</p>
                    </div>
                </section>
            </main>
        </div>
    )
}
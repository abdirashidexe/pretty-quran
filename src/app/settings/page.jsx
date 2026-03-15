"use client";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useTheme } from "../context/ThemeContext";

const themes = [
    { id: "theme-default", label: "Midnight",    colors: ["#0d1117", "#161b27", "#c9a84c"] },
    { id: "theme-black",   label: "Almost Black", colors: ["#0a0a0a", "#111111", "#c9a84c"] },
    { id: "theme-pink",    label: "Pink",         colors: ["#1a0d14", "#2a1020", "#e87fa0"] },
    { id: "theme-baby-blue", label: "Baby Blue", colors: ["#0d121a", "#101a2a", "#87ceeb"]}
];

export default function Settings() {
    const { theme, changeTheme, isDark } = useTheme();  // ← both reading AND writing this time

    return (
        <div className={`page ${theme} ${isDark ? "" : "light"}`}>
            <Header />
            <main className="main">
                <section className="section">
                    <h2 className="sectionTitle">Settings</h2>
                    <div className="comingSoon">
                        <span className="comingSoonIcon">⚙️</span>
                        <h3 className="comingSoonTitle">Settings coming soon</h3>
                        <p className="comingSoonText">Customise your reading experience — translations, font size, and more.</p>
                    </div>
                    <div className="settingsGroup">
                        <br></br>
                        <p className="comingSoonText">But for now.. design your experience because why not?</p>
                        <h3 className="settingsLabel">Theme</h3>
                        <div className="themeOptions">
                            {themes.map((currentTheme) => (
                                <button
                                    key={currentTheme.id}
                                    onClick={() => changeTheme(currentTheme.id)}
                                    className={`themeOption ${theme === currentTheme.id ? "themeOptionActive" : ""}`}
                                >
                                    <div className="themeSwatches">
                                        {currentTheme.colors.map((color) => (
                                            <span
                                                key={color}
                                                className="themeSwatch"
                                                style={{ background: color }}
                                            />
                                        ))}
                                    </div>
                                    <span className="themeOptionLabel">{currentTheme.label}</span>
                                    {theme === currentTheme.id && <span className="themeOptionCheck">✓</span>}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
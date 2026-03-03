"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("theme-default");
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem("quran-theme");
        if (saved) setTheme(saved);

        const userDarkModeState = localStorage.getItem("quran-darkMode");
        if (userDarkModeState) {
            const asBoolean = userDarkModeState === "true"; // "true" → true, "false" → false
            setIsDark(asBoolean);
        }

    }, []);

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem("quran-theme", newTheme);
    };

    const toggleDark = () => {
        const next = !isDark;
        setIsDark(next);
        localStorage.setItem("quran-darkMode", next);
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme, isDark, toggleDark }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
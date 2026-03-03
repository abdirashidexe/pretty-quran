"use client"
import { useState, useEffect } from "react";
import AllJuzs from "../components/AllJuzs";
import Header from "../components/Header";
import { useTheme } from "../context/ThemeContext";

export default function AllJuzPage() {
    const [juzs, setJuzs] = useState([]);
    const [surahs, setSurahs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme, isDark } = useTheme();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/juz`)
            .then((res) => res.json())
            .then((data) => {
                const visited = [];
                const uniqueData = [];
                data.juzs.forEach((juz) => {
                    if (!visited.includes(juz.juz_number)) {
                        visited.push(juz.juz_number);
                        uniqueData.push(juz);
                    }
                });
                setJuzs(uniqueData);
            })
            .catch(() => setLoading(false));

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/surahs`)
            .then((res) => res.json())
            .then((data) => {
                setSurahs(data.chapters);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className={`page ${theme} ${isDark ? "" : "light"}`}>
            <Header />
            <AllJuzs juzs={juzs} surahs={surahs} loading={loading} />
        </div>
    )
}
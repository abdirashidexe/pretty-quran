import Link from "next/link"

const popularSurahs = [
    { id: 1,  name: "Al-Fatihah", arabic: "الفاتحة", meaning: "The Opening" },
    { id: 18, name: "Al-Kahf",    arabic: "الكهف",   meaning: "The Cave" },
    { id: 55, name: "Ar-Rahman",  arabic: "الرحمن",  meaning: "The Most Gracious" },
    { id: 67, name: "Al-Mulk",    arabic: "الملك",   meaning: "The Sovereignty" },
];

export default function MainPopularSurahs() {
    return (
        <section className="section">
            <h2 className="sectionTitle">Quick Access</h2>
            <div className="popularGrid">
                {popularSurahs.map((surah) => (
                    <Link href={`/surah/${surah.id}`} key={surah.id} className="surahCard">
                        <div className="surahNumber">{surah.id}</div>
                        <div className="surahInfo">
                            <h3 className="surahName">{surah.name}</h3>
                            <p className="surahMeaning">{surah.meaning}</p>
                        </div>
                        <div className="surahArabic">{surah.arabic}</div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
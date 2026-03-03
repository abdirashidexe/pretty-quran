import Link from "next/link"

export default function AllSurahs({ surahs, loading }) {
    return (
        <main className="main">
            <section className="section">
                <h2 className="sectionTitle">Browse Surahs</h2>
                {loading ? (
                    <p style={{ color: 'var(--text-muted)' }}>Loading surahs...</p>
                ) : (
                    <div className="surahGrid">
                        {surahs.map((surah) => (
                            <Link href={`/surah/${surah.id}`} key={surah.id} className="surahCard">
                                <div className="surahNumber">{surah.id}</div>
                                <div className="surahInfo">
                                    <h3 className="surahName">{surah.name_simple}</h3>
                                    <p className="surahMeaning">{surah.translated_name.name}</p>
                                    <p className="surahVerses">{surah.verses_count} verses</p>
                                </div>
                                <div className="surahArabic">{surah.name_arabic}</div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}
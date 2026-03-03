import Link from "next/link"

export default function AllJuzs({ juzs, surahs, loading }) {
    const surahMap = {};
    surahs.forEach((surah) => {
        surahMap[surah.id] = surah.name_simple;
    });

    return (
        <main className="main">
            <section className="section">
                <h2 className="sectionTitle">Browse Juzs</h2>
                {loading ? (
                    <p style={{ color: 'var(--text-muted)' }}>Loading juzs...</p>
                ) : (
                    <div className="surahGrid">
                        {juzs.map((juz) => (
                            <Link href="#" key={juz.juz_number} className="surahCard juzCard">
                                <div className="surahNumber">{juz.juz_number}</div>
                                <div className="surahInfo">
                                    <h3 className="surahName">Juz {juz.juz_number}</h3>
                                    <div className="juzSurahList">
                                        {Object.entries(juz.verse_mapping).map(([surahNumber, verseRange]) => (
                                            <span key={surahNumber} className="juzSurahTag">
                                                {surahMap[surahNumber] || `Surah ${surahNumber}`}
                                                <span className="juzVerseRange">{verseRange}</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}
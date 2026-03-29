import Link from "next/link"
import { useEffect } from "react";

export default function Footer({title, artist, mushaf}) {

    useEffect(() => {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: title,
                artist: artist,
                album: mushaf,
                artwork: [
                    { src: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
                ]
            });
        }
    }, [artist, mushaf]); // good habit to add "title" even though not needed

    return (
        <footer className="footer">
            <Link href="https://www.instagram.com/abdrrrshd/" target="_blank" className="ig">Instagram</Link>
            <p>Read, reflect, and recite. ✧</p>
        </footer>
    )
}
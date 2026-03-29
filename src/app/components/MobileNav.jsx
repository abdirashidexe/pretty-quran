import Link from "next/link"
import { useState } from "react"

export default function MobileNav() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="mobile-only dropdown">
                <button className="trigger" onClick={() => setIsOpen(!isOpen)}>Menu</button>
                {isOpen &&
                    <ul className="menu">
                        <li><Link href="/" className="navLink">Home</Link></li>
                        <li><Link href="/surahs" className="navLink">Surahs</Link></li>
                        <li><Link href="/juzs" className="navLink">Juz</Link></li>
                        <li><Link href="/bookmarks" className="navLink">Bookmarks</Link></li>
                        {/* <li><Link href="/addareciter" className="navLink">Submit a Reciter</Link></li> */}
                        <li><Link href="/settings" className="navLink">Settings</Link></li>
                    </ul>
                }
            </div>
        </>
    )
}
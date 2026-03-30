"use client"

import { useState } from "react"
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import Link from "next/link";


export default function suggestReciter() {

    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [note, setNote] = useState("");

    // const handleSubmit = (userEvent) => {
    //     userEvent.preventDefault();
    //     console.log(name, link, note)
    //     setSubmitted(true)
    // }

    const [validationError, setValidationError] = useState("")
    const handleSubmit = async (userEvent) => {
        userEvent.preventDefault();
        console.log(name, link, note)

        setValidationError("")
        // if (name === "" || link === "") {
        if (!name || !link) {
            setValidationError("Missing required fields.")
            return
        }

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/suggest-reciter`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, link, note })
        })

        setSubmitted(true)
    }

    const [submitted, setSubmitted] = useState(false)
    const { theme, isDark } = useTheme();


    return (
        <>
            <div className={`page ${theme} ${isDark ? "" : "light"}`}>
                <Header />
                <main className="main">
                    <h1 className="pageTitle">Suggest a Reciter</h1>
                    {submitted ? (
                        <>
                            <p className="formSuccess">Thanks! We'll look into it 🤍</p>
                            <Link href="/surahs" className="btn" id="all-surahs-btn">Go to All Surahs</Link>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate>
                            <label className="formLabel">
                                Reciter's Name
                                <input className="formInput" type="text" value={name} onChange={(userEvent) => setName(userEvent.target.value)} required />
                            </label>
                            <label className="formLabel">
                                Link to Playlist (YouTube / Spotify / SoundCloud / etc.)
                                <input className="formInput" type="text" value={link} onChange={(userEvent) => setLink(userEvent.target.value)} required />
                            </label>
                            <label className="formLabel">
                                Note / Message
                                <textarea className="formInput formTextarea" value={note} onChange={(userEvent) => setNote(userEvent.target.value)} />
                            </label>
                            {validationError !== "" ? <p className="validation-error">{validationError}</p> : ""}
                            <button className="formSubmit" type="submit">Submit</button>
                        </form>
                    )}
                </main>
                <Footer />
            </div>

        </>
    )
}
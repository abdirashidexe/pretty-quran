"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useTheme } from "../context/ThemeContext"

export default function ReportBugs() {

    const [subject, setSubject] = useState("")
    const [bugDesc, setBugDesc] = useState("")
    const [submitted, setSubmitted] = useState(false)

    function handleSubject(userEvent) {
        setSubject(userEvent.target.value)
    }

    function handleBugDesc(userEvent) {
        setBugDesc(userEvent.target.value)
    }

    const [validationError, setValidationError] = useState("")
    async function handleSubmit(userEvent) {
        userEvent.preventDefault();
        console.log(subject, bugDesc);
        console.log("Submitted!")

        // if (subject === "" || bugDesc === "") {
        if (!subject || !bugDesc) {
            setValidationError("Missing required fields.")
            return
        }

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/report-bugs`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subject, bugDesc })
        })

        setSubmitted(true)
    }

    const { theme, isDark } = useTheme();

    return (
        <>
            <div className={`page ${theme} ${isDark ? "" : "light"}`}>
                <Header />
                <main className="main">
                    <h1 className="pageTitle">Report a Bug</h1>
                    {submitted ?
                        <>
                            <p className="formSuccess">Thanks! We'll look into it 🤍</p>
                            <Link href="/surahs" className="btn" id="all-surahs-btn">Go to All Surahs</Link>

                        </>
                        :
                        <form onSubmit={handleSubmit} noValidate>
                            <label className="formLabel">
                                Subject:
                                <input className="formInput" type="text" value={subject} onChange={handleSubject} required />
                            </label>

                            <label className="formLabel">
                                Description of bug: <i>*please include as much information as you can</i>
                                <textarea className="formInput formTextarea" value={bugDesc} onChange={handleBugDesc} required></textarea>
                            </label>
                            {validationError !== "" ? <p className="validation-error">{validationError}</p> : ""}
                            <button className="formSubmit" type="submit">Submit</button>
                        </form>
                    }
                </main>
                <Footer />
            </div>

        </>
    )
}
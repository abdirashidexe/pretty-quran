"use client";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {/* Abdirashid's Notes */}
        {/* {children} <-- is my entire app */}
        {/* UseTheme() is now available to every single component :O Wthh.. */}
      </body>
    </html>
  );
}
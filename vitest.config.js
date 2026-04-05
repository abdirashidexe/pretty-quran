// why install cmd was longer than vitest docs
//  vitest — the test runner itself
//  @vitejs/plugin-react — lets Vitest understand JSX
//  jsdom — a fake browser so components have a DOM to render into
//  @testing-library/react — helpers to render React components in tests
//  @testing-library/jest-dom — readable matchers like toBeInTheDocument()


// Setting up test settings in this document

// It is not a test. It is not writing any tests at all.
// It's just telling Vitest how to behave before it runs
// anything. It has 3 settings:

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()], // "understand JSX when you read my files"
    test: {
        environment: 'jsdom', // "pretend you're a browser, not a terminal"
        setupFiles: ['./vitest.setup.js'], // "run this file before every test suite"
        globals: true, // makes expect, describe, it available everywhere
    },
})
import '@testing-library/jest-dom'

// 5. vitest.setup.js — yes, just one line
//  That one line imports @testing-library/jest-dom which adds the extra matchers to Vitest globally. You write it once, and because it's in setupFiles, it runs before every test automatically. You never touch it again.
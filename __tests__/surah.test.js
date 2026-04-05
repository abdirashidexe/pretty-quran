// This is the test file that contains 3 unit tests.
import { describe, it, expect } from "vitest";

// This is a plain function - not imported from Qirayah, just written here
// We're testing the LOGIC of filtering, not the UI
function filterSurahs(surahs, query) {
    if (!query) return surahs
    return surahs.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase())
    )
}

// Fake data to test against - no real API calls
const mockSurahs = [
    { id: 1, name: 'Al-Fatiha' },
    { id: 2, name: 'Al-Baqarah' },
    { id: 3, name: 'Ali-Imran' },
]

// describe = a group of related tests with a label
describe('surah filtering', () => {

      // it = one single test. reads like a sentence: "it does X"
    it('returns all surahs when query is empty', () => {
        expect(filterSurahs(mockSurahs, '')).toHaveLength(3)
    // translation: "I expect the result to have 3 items"
    })

    it('filters by name correctly', () => {
        const result = filterSurahs(mockSurahs, 'baq')
        expect(result).toHaveLength(1)
        expect(result[0].name).toBe('Al-Baqarah')
    // translation: "I expect 1 result, and its name should be Al-Baqarah"
    })

    it('is case insensitive', () => {
        expect(filterSurahs(mockSurahs, "AL-FATIHA")).toHaveLength(1)
    // translation: "searching in all caps should still find it"
    })
})

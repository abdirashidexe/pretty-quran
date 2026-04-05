// @vitest-environment node

import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/backend/server.js'

describe('GET /api/reciters', () => {
    it('returns 200', async () => {
        const res = await request(app).get('/api/reciters')
        expect(res.status).toBe(200)
    })

    it('response has a reciters array', async () => {
        const res = await request(app).get('/api/reciters')
        expect(res.body).toHaveProperty('reciters') // property? like object property?
        expect(Array.isArray(res.body.reciters)).toBe(true) // is this a good test? just testing if an array called reciters is back? what if its empty? or is that what the next one tests?
    })

    it('each reciter has an id and name', async () => {
        const res = await request(app).get('/api/reciters')
        const first = res.body.reciters[0] // testing only 1st reciter??
        expect(first).toHaveProperty('id')
        expect(first).toHaveProperty('name')
    })
})

describe('POST /api/suggest-reciter', () => {
    it('returns 200 with valid body', async () => {
        const res = await request(app)
            .post('/api/suggest-reciter')
            .send({ name: 'Test Reciter', link: 'https://example.com', note: 'test' })
        expect(res.status).toBe(200)
        expect(res.body.success).toBe(true)
    })
})
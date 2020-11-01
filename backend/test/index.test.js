/* eslint-disable no-undef */
import { config }from 'dotenv';
import fetch from "node-fetch";

config()
test('It should return success: true', async () => {
    const url = await fetch(`http://localhost:${process.env.PORT}/test`)
    const response = await url.json()
    expect(response.success).toBe(true)
} )
import {multiply} from "../multiply.js";
import {cacheData} from "../index.js";
import {getLastEntry} from "../index.js";

test("Post request should return 200", async () => {
    const a = "15"
    const b = "295"
    const result = multiply(a, b)
    await cacheData({a: a, b: b, result: result})
        .then(r => {
            expect(r.status).toBe(200)
        })
})

test("Get request should return 200", async () => {
    await getLastEntry()
        .then(r => {
            expect(r.status).toBe(200)
        })
})

test("Post request with incomplete data should return 500", async () => {
    const a = "15"
    const b = "295"
    await cacheData({a: a, b: b})   // without result!!!
        .then(r => {
            expect(r.status).toBe(500)
        })
})

test("Get request should return object with 3 keys", async() => {
    await getLastEntry()
        .then(r => r.json())
        .then(data => {
            expect(Object.keys(data).length).toBe(3)
        })
})

test("Get request should return object with particular keys", async() => {
    const expected = ['a', 'b', 'result']

    await getLastEntry()
        .then(r => r.json())
        .then(data => {
            expect(Object.keys(data)).toMatchObject(expected)
        })
})

test("Get should return correct data", async() => {
    const a = "2345"
    const b = "769765"
    const result = multiply(a, b)
    const expected = {a: a, b: b, result: result}

    await cacheData(expected)

    await getLastEntry()
        .then(r => r.json())
        .then(data => {
            expect(data).toMatchObject(expected)
        })
})

test("Get should return correct data [negative numbers case]", async() => {
    const a = "-2345"
    const b = "769765"
    const result = multiply(a, b)
    const expected = {a: a, b: b, result: result}

    await cacheData(expected)

    await getLastEntry()
        .then(r => r.json())
        .then(data => {
            expect(data).toMatchObject(expected)
        })
})
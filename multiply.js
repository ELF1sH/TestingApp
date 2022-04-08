export function multiply(a, b) {
    if (!a || !b) return new Error("Empty argument")
    let isResultNegative = false
    if (a[0] === "-") {
        isResultNegative = !isResultNegative
        a = a.split('').slice(1).join('')
    }
    if (b[0] === "-") {
        isResultNegative = !isResultNegative
        b = b.split('').slice(1).join('')
    }
    const ALPHABET = '0123456789'.split('')
    a = a.split('').reverse().join('')
    b = b.split('').reverse().join('')
    for (const symbol of a) {
        if (!ALPHABET.includes(symbol)) return new Error("Invalid character")
    }
    for (const symbol of b) {
        if (!ALPHABET.includes(symbol)) return new Error("Invalid character")
    }
    const results = []
    for (let digitB of b) {
        digitB = +digitB
        let reminder = 0
        let cur_result = ""
        for (let digitA of a) {
            digitA = +digitA
            const multiplication = digitA * digitB + reminder
            cur_result = (multiplication % 10).toString().concat(cur_result)
            reminder = Math.floor(multiplication / 10)
        }
        cur_result = reminder.toString().concat(cur_result)
        cur_result = cur_result.split('').reverse().map(digit => +digit)
        results.push(cur_result)
    }
    let final_result = results[0]
    results.forEach((item, index) => {
        if (index !== 0) {
            let reminder = 0
            item.forEach((digit, letterIndex) => {
                digit = +digit
                if (typeof final_result[letterIndex + index] !== "undefined") {
                    final_result[letterIndex + index] += (digit + reminder)
                    if (final_result[letterIndex + index] > 9) {
                        reminder = Math.floor(final_result[letterIndex + index] / 10)
                        final_result[letterIndex + index] = final_result[letterIndex + index] % 10
                    }
                    else {
                        reminder = 0
                    }
                }
                else {
                    final_result.push(digit + reminder)
                }
            })
        }
    })
    final_result = final_result.reverse().join('')
    while (final_result[0] === '0') final_result = final_result.substring(1)
    if (final_result) {
        if (isResultNegative) final_result = "-".concat(final_result)
        return final_result
    }
    else return "0"
}

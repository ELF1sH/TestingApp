import {multiply} from "./multiply.js";

const testFieldA = document.getElementById("textFieldA")
const testFieldB = document.getElementById("textFieldB")
const btnCalculate = document.getElementById("btnCalculate")
const resultSpan = document.getElementById("resultSpan")

btnCalculate.addEventListener("click", () => {
    const a = testFieldA.value
    const b = testFieldB.value
    resultSpan.innerText = multiply(a, b)
})
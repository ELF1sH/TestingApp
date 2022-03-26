import {multiply} from "../script.js";

test("Simple multiplication", () => {
    expect(multiply("3", "5")).toBe("15")
    expect(multiply("15", "295")).toBe("4425")
})

test("Multiplication with zero", () => {
    expect(multiply("34545", "0")).toBe("0")
    expect(multiply("0", "234324")).toBe("0")
    expect(multiply("0", "0")).toBe("0");
})

test("Multiplication with invalid symbols", () => {
    expect(() => {multiply("3f", "34")}).toThrow(Error('Invalid character'))
    expect(() => {multiply("345", "654654353g")}).toThrow(Error('Invalid character'))
    expect(() => {multiply("Hello", "world!")}).toThrow(Error('Invalid character'))
})

test("Huge numbers multiplication", () => {
    expect(multiply("57754557855345435", "235325235252525")).toBe("13591104914214730219973330973375")
    expect(multiply("8162591832756298357698435634598265439856243985432531658356439285623985437256239845643754238",
        "4760329465980659827346543298564327562084397623895743089670326872430962347609346730694237609423603948674"))
        .toBe("38856626420242885133894068714962636031252810330947412625596948289493703102116268232098662046824748353463348158624929666081250627572817004045146310430108443694854399846006418933047494722421980412")
})

test("Negative numbers multiplication", () => {
    expect(multiply("-3", "5")).toBe("-15")
    expect(multiply("15", "-295")).toBe("-4425")
    expect(multiply("-23424324324", "-234242424")).toBe("5486970510215921376")
})

test("Multiplication with numbers starting with zeros", () => {
    expect(multiply("03", "5")).toBe("15")
    expect(multiply("0000000000000000000000015", "0000000000000000000000000000000000000295")).toBe("4425")
})
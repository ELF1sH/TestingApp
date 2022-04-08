it ("Application should launch", () => {
    cy.visit('http://127.0.0.1:5500/index.html')
})

it ("Application should execute correct calculations", () => {
    cy.visit('http://127.0.0.1:5500/index.html')

    cy.get("#textFieldA").type("11")
    cy.get("#textFieldB").type("2")

    cy.get("#btnCalculate").click()

    cy.get("#resultSpan").contains("22")
})

it ("Application should execute correct calculations [big numbers]", () => {
    cy.visit('http://127.0.0.1:5500/index.html')

    cy.get("#textFieldA").type("3457474374362754747763457437457347")
    cy.get("#textFieldB").type("490672340986736093769036874329607432")

    cy.get("#btnCalculate").click()

    cy.get("#resultSpan").contains("1696487045170223639396454697787562485678616460915640594614894754202904")
})

it ("Application should execute correct calculations [negative numbers]", () => {
    cy.visit('http://127.0.0.1:5500/index.html')

    cy.get("#textFieldA").type("-3457474374362754747763457437457347")
    cy.get("#textFieldB").type("490672340986736093769036874329607432")

    cy.get("#btnCalculate").click()

    cy.get("#resultSpan").contains("-1696487045170223639396454697787562485678616460915640594614894754202904")
})

it ("Application should execute correct calculations [negative numbers twice]", () => {
    cy.visit('http://127.0.0.1:5500/index.html')

    cy.get("#textFieldA").type("-22")
    cy.get("#textFieldB").type("-22")

    cy.get("#btnCalculate").click()

    cy.get("#resultSpan").contains("484")
})

it ("Application should return error when gets empty argument", () => {
    cy.visit('http://127.0.0.1:5500/index.html')

    // nothing to type into #testFieldA
    cy.get("#textFieldB").type("490672340986736093769036874329607432")

    cy.get("#btnCalculate").click()

    cy.get("#resultSpan").contains("Error: Empty argument")
})

it ("Application should return error when gets argument with invalid symbols", () => {
    cy.visit('http://127.0.0.1:5500/index.html')

    cy.get("#textFieldA").type("-3456sdfgfsd5345")
    cy.get("#textFieldB").type("490672340986736093769036874329607432")

    cy.get("#btnCalculate").click()

    cy.get("#resultSpan").contains("Error: Invalid character")
})
import elements from "../fixtures/elements.json";

Cypress.Commands.add("addTag", (text) => {
  cy.get(elements.input).type(text);
});

Cypress.Commands.add("deleteAll", () => {
  cy.get(elements.removeAllBtn).click();
});

Cypress.Commands.add("getTagsList", () => {
  cy.get(elements.tagList);
});

Cypress.Commands.add("getCounter", () => {
  cy.get(elements.tadsCounter); // tagsCounter?
});
Cypress.Commands.add("deleteTag", (text) => {
  var el = cy.get(elements.tagList).contains(text);
  el.children(".uit").click();
});
Cypress.Commands.add("addLongTag", (TagLength) => {
    for (let i = 0; i < +TagLength; i++) {
      cy.addTag("1"); // why 1?
    }
    cy.addTag("{enter}");
  });
  

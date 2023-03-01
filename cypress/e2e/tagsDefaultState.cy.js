import elements from "../fixtures/elements.json";
import config from "../fixtures/config.json";

describe("defultState", () => {
  it("check that the default number the shown is max tags - default tags.", function () {
    cy.getCounter().should("have.text", config.maxTags - config.sumDefaultTag);
  });

  it("add tags -  reload page - the default tags show.", function () {
    cy.addTag("ironSource,game{enter}");
    cy.reload();
    cy.getTagsList()
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal(config.defaultTags);
      });
    cy.getTagsList().should("have.length", config.sumDefaultTag);
  });

  it("add tags - reload page - the counter update.", function () {
    cy.addTag("ironSource,game{enter}");
    cy.reload();
    cy.getCounter().should("have.text", config.maxTags - config.sumDefaultTag);
  });

  it("delete one of the default tags, reload page - check that there is only 2 tags.", function () {
    cy.deleteTag("javascript");
    cy.reload();
    cy.getTagsList().should("have.length", config.sumDefaultTag);
  });

  it("instruction text ", function () {
    cy.get(elements.instructionText).should(
      "have.text",
      config.instructionTextExpect
    );
  });
});

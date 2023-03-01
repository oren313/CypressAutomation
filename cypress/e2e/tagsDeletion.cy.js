import config from "../fixtures/config.json";

describe("delete tag", () => {

  it("add tags and delete one of them - check if the counter increased.", function () {
    cy.addTag("ironSource,game{enter}");
    cy.deleteTag("ironSource");
    cy.getCounter().should("have.text", config.maxTags - config.sumDefaultTag - 1);
  });

  it("add tag and delete him - the tag that was added deleted from the tags list.", function () {
    cy.addTag("ironSource{enter}");
    cy.deleteTag("ironSource");
    cy.getTagsList().contains("ironSource").should("not.exist");
  });

  it("remove all", function () {
    cy.deleteAll();
    cy.getTagsList().should("have.length", null);
  });

});

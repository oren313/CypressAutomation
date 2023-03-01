import elements from "../fixtures/elements.json";
import config from "../fixtures/config.json";

describe("add tag", () => {
  it("Tags longer than the component framework's width should not be allowed", function () {
    cy.addLongTag(100);
    cy.get("ul").then((frameworkElement) => {
      cy.getTagsList().then((tagsListElement) => {
        const frameworkwidth = frameworkElement[0].getBoundingClientRect();
        const tagListwidth =
          tagsListElement[config.sumDefaultTag].getBoundingClientRect();
        expect(tagListwidth.width).to.be.lessThan(frameworkwidth.width);
      });
    });
  });

  it("Insert tag that is longer than the component framework – The tag splits into several lines suitable for framework", function () {
    cy.addLongTag(100);
    cy.get("ul").then((frameworkElement) => {
      cy.getTagsList().then((tagsListElement) => {
        const frameworkRect = frameworkElement[0].getBoundingClientRect();
        const tagElement = tagsListElement.eq(config.sumDefaultTag);
        const tagRect = tagElement[0].getBoundingClientRect();
        expect(tagRect.top).to.be.greaterThan(frameworkRect.top);
        expect(tagElement[0].clientWidth).to.be.lessThan(
          frameworkElement[0].clientWidth
        );
        expect(tagElement.css("white-space")).to.equal("normal");
      });
    });
  });

  it("add a tag - check that the tag was added", function () {
    cy.addTag("ironSource{enter}");
    cy.getTagsList().should("include.text", "ironSource");
  });

  it("add a several tags together - check that they were added", function () {
    cy.addTag("ironSource,game,play{enter}");
    cy.getTagsList()
      .should("contain.text", "ironSource")
      .should("contain.text", "game")
      .should("contain.text", "play");
  });

  it("add a singel tag - check if the counter decreased", function () {
    cy.addTag("game{enter}");
    cy.getCounter().should(
      "have.text",
      config.maxTags - config.sumDefaultTag - 1
    );
  });

  it("add a several tags - check if the counter decreased", function () {
    cy.addTag("game,ironSource,play{enter}");
    cy.getCounter().should(
      "have.text",
      config.maxTags - config.sumDefaultTag - 3
    );
  });
  //think how to make taht func in commands
  it("add 11 tags one by one - not allowed", function () {
    for (let i = 0; i <= config.maxTags - config.sumDefaultTag; i++) {
      cy.addTag(`${i}${i}{enter}`);
    }
    cy.getTagsList().should("have.length", config.maxTags);
  });

  it("add 10 tags one by one - allowed", function () {
    for (let i = 0; i < config.maxTags - config.sumDefaultTag; i++) {
      cy.addTag(`${i}${i}{enter}`);
    }
    cy.getTagsList().should("have.length", config.maxTags);
  });

  it("add 11 tags together - not allowed", function () {
    let tagListToCheck = "";
    for (let i = 0; i < config.maxTags - config.sumDefaultTag + 1; i++) {
      tagListToCheck += `${i}${i},`;
    }
    tagListToCheck = tagListToCheck.slice(0, -1);
    cy.addTag(tagListToCheck + "{enter}");
    cy.getTagsList().should("have.length", config.maxTags);
  });

  it("add 11 tags together - the tag first is not allowed", function () {
    let tagListToCheck = "";
    for (let i = 0; i < config.maxTags - config.sumDefaultTag + 1; i++) {
      tagListToCheck += `${i}${i},`;
    }
    tagListToCheck = tagListToCheck.slice(0, -1);
    cy.addTag(tagListToCheck + "{enter}");
    cy.getTagsList().should("not.include.text", "00");
  });
  //split?
  it("add one char tag - the tag wont count and wont added", function () {
    cy.addTag("£{enter}");
    cy.getTagsList().should("not.include.text", "£");
    cy.getCounter().should("have.text", config.maxTags - config.sumDefaultTag);
  });
  //split?
  it("add a one char tag as a part of several tags - the tag with on char wont count and wont added", function () {
    cy.addTag("£,game{enter}");
    cy.getCounter().should(
      "have.text",
      config.maxTags - config.sumDefaultTag - 1
    );
    cy.getTagsList().should("not.include.text", "£");
  });
  it("add tag that contains one char and a space - the tag will not be saved", function () {
    cy.addTag(" £ {enter}");
    cy.getTagsList().should("not.include.text", "£ ");
  });
  it("add a one char tag as a part of several tags that contains one char and a space - the tag will not be saved", function () {
    cy.addTag(" £ ,game{enter}");
    cy.getTagsList().should("not.include.text", "£ ");
  });

  it("add a tag and check if the input field empty", function () {
    cy.addTag("ironSource{enter}");
    cy.get(elements.input).should("be.empty");
  });

  it("add a several tags together and check if the input field empty", function () {
    cy.addTag("ironSource,game,play{enter}");
    cy.get(elements.input).should("be.empty");
  });

  it("add the same tag, one by one - check that only one added and counted", function () {
    cy.addTag("ironSource{enter}");
    cy.addTag("ironSource{enter}");
    cy.getTagsList().should("have.length", +config.sumDefaultTag + 1);
    cy.getTagsList().contains("ironSource").should("have.length", 1);
    cy.getCounter().should(
      "have.text",
      config.maxTags - config.sumDefaultTag - 1
    );
  });
  //split?
  it("add the same tag name as a string split by comma - check that only one of the duplicitous tag added and counted", function () {
    cy.addTag("game,game,ironSource{enter}");
    cy.getTagsList().should("have.length", +config.sumDefaultTag + 2);
    cy.getTagsList().contains("game").should("have.length", 1);
    cy.getCounter().should(
      "have.text",
      config.maxTags - config.sumDefaultTag - 2
    );
  });
});

const { assertAnyTypeAnnotation } = require("@babel/types");
const assert = require('assert');

Feature('Sample Feature');

Scenario('first test', ({ I }) => {
    I.amOnPage("https://www.example.com")
    I.wait(1)
    I.saveScreenshot("test.png",true)
});

Scenario('Second test', ({ I }) => {
    I.amOnPage("https://www.example.com")
    I.see("Example")
    I.dontSee('Google')
    I.seeElement("h1")
    I.dontSeeElement(".video-players")
    I.wait(2)
});

Scenario('third test', async({ I }) => {
    I.amOnPage("https://www.example.com")
    const text = await I.grabTextFrom("h1")
    I.wait(3)
    console.log(text)
    assert.strictEqual(text, "Example Domain", "Text does not match..")
});

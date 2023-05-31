const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement, choosesPlace, choosesWeekDay, choosesSeance } = require("../../lib/commands.js");

Before(async function () {
    const browser = await puppeteer.launch({ headless: false, slowMo: 50});
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
});
  
After(async function () {
    if (this.browser) {
        await this.browser.close();
    }
});

Given("user is on {string} page", async function (string) {
    return await this.page.goto(string);
});

When("user chooses day {int}, hall {int} and seance {int}", async function (int, int2, int3) {
    await choosesWeekDay(this.page, int);
    return await choosesSeance(this.page, int2, int3);
});

When("user chooses row {int}, chair {int} and click booked", async function (int, int2) {
    await choosesPlace(this.page, int, int2);
    const buttonBook = ".acceptin-button";
    await clickElement(this.page, buttonBook);
    await this.page.waitForSelector(buttonBook);
});

When("user chooses row {int}, chair {int} and chair {int} and click booked", async function (int, int2, int3) {
    await choosesPlace(this.page, int, int2);
    await choosesPlace(this.page, int, int3);
    const buttonBook = ".acceptin-button";
    await clickElement(this.page, buttonBook);
    await this.page.waitForSelector(buttonBook);
});

When("user click get code booking", async function () {
    const buttonBook = ".acceptin-button";
    await clickElement(this.page, buttonBook);
    const title = await this.page.$eval(".ticket__check-title", (link) => link.textContent);
    expect(title).contains("Электронный билет");
});

When("user back start page", async function () {
    await this.page.goBack();
});

Then("user sees the booked ticket", async function () {
    const title = await this.page.$eval(".ticket__check-title", (link) => link.textContent);
    expect(title).contain("Вы выбрали билеты:");
});

Then("user chooses row {int}, chair {int} and sees chair reserving", async function (int, int2) {
    await choosesPlace(this.page, int, int2);
    const selectedChair = `div.buying-scheme__row:nth-child(${int}) span:nth-child(${int2})`;
    const actualStatus = await this.page.$eval(selectedChair, (link) => link.className);
    expect(actualStatus).contain("chair_taken");
});
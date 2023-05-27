module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  getTextFromSelector: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      const testSelector = await page.$(selector);
      return await page.evaluate((el) => el.textContent, testSelector);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },

  getTextFormLink: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      let element = await page.$(selector);
      const text = await (await element.getProperty("src")).jsonValue();
      return await text;
      //return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },
  putText: async function (page, selector, text) {
    try {
      const inputField = await page.$(selector);
      await inputField.focus();
      await inputField.type(text);
      await page.keyboard.press("Enter");
    } catch (error) {
      throw new Error(`Not possible to type text for selector: ${selector}`);
    }
  },
};
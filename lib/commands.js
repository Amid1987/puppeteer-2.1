module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },
  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
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
  choosesPlace: async function (page, row, chair) {
    try {
      const cssSel = `div.buying-scheme__row:nth-child(${row}) span:nth-child(${chair})`;
      await page.waitForSelector(cssSel);
      await page.click(cssSel);
    } catch (error) {
      throw new Error(
        `this place cannot be booked, please check: row ${row}, chair ${chair}`
      );
    }
  },
  choosesWeekDay: async function (page, dayOfWeek) {
    const cssSelector = `.page-nav__day:nth-child(${dayOfWeek}`;
    await page.click(cssSelector);
  },
  choosesSeance: async function (page, hallNum, seanceNum) {
    const seance = `.movie:nth-child(${hallNum}) .movie-seances__time-block:nth-child(${seanceNum})`;
    await page.waitForSelector(seance);
    await page.click(seance);
  },
};
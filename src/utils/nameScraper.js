const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { writeFileAsync } = require('./fileHelpers');

/**
 * Gets names data from Cheerio parsed html object
 *
 * @param {Function} $ - Cheerio function reference
 * @param {Object} arr - Cheerio parsed html object
 * @returns {Array}
 */
function getDataFromList($, arr) {
  return arr
    .map((i, el) => {
      if (el.children.length === 0) return;

      const obj = {
        name: $(el.children[0])
          .text()
          .trim(),
        extra: '',
      };

      if (el.children.length > 1) {
        const extra = $(el.children[1])
          .text()
          .trim();

        if (extra) {
          obj.extra = extra;
        }
      }

      return obj;
    })
    .toArray();
}

/**
 * Parses html for Icelandic names
 *
 * @param {String} html - Html text string
 * @returns {Promise<Object>}
 */
function parseHtml(html) {
  return new Promise((resolve, reject) => {
    try {
      const $ = cheerio.load(html);
      const nameTypeList = $('.nafnalisti .nametype');
      const boysNamesObj = $(nameTypeList[0]).find('ul.dir li');
      const girlsNamesObj = $(nameTypeList[1]).find('ul.dir li');
      const middleNamesObj = $(nameTypeList[2]).find('ul.dir li');
      const boysNamesList = getDataFromList($, boysNamesObj);
      const girlsNamesList = getDataFromList($, girlsNamesObj);
      const middleNamesList = getDataFromList($, middleNamesObj);

      return resolve({
        boys: boysNamesList,
        girls: girlsNamesList,
        middle: middleNamesList,
      });
    } catch (error) {
      return reject(error);
    }
  });
}

/**
 * Fetches Icelandic name html from island.is
 *
 * @returns {String}
 */
async function fetchIcelandicNames() {
  const url =
    'https://www.island.is/mannanofn/leit-ad-nafni/?Nafn=&Stulkur=on&Drengir=on&Millinofn=on';

  try {
    const res = await fetch(url);
    const html = await res.text();
    return html;
  } catch (error) {
    return error;
  }
}

/**
 * Initializes Icelandic names scraper
 */
async function initScraper() {
  try {
    const html = await fetchIcelandicNames();
    const data = await parseHtml(html);
    await writeFileAsync('./data/names.json', JSON.stringify(data));
    return true;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = initScraper;

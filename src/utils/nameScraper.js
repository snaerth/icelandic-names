const cheerio = require('cheerio');
const uniqid = require('uniqid');
const fetch = require('node-fetch');
const createUUID = require('./createUUID');
const { writeFileAsync } = require('./fileHelpers');

/**
 * Creates letter indexes and alhpabet array
 * @param {Array} list - list of names object { id: '4n5pxq24kpiob12og9', name: 'Jon', subtitle: 'More info' }
 * @returns {Object}
 */
function getLetterIndexesAndAlhpabet(list) {
  const alphabet = [];
  let i = 0;

  const letterIndexes = list.reduce((acc, curr) => {
    if (acc[curr.name[0]] === undefined) {
      acc[curr.name[0]] = i;
      alphabet.push(curr.name[0]);
    }

    i += 1;
    return acc;
  }, {});

  return {
    alphabet,
    letterIndexes,
    list,
  };
}

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

      const name = $(el.children[0])
        .text()
        .trim();
      const obj = {
        id: createUUID(name),
        name,
        subtitle: '',
      };

      if (el.children.length > 1) {
        const subtitle = $(el.children[1])
          .text()
          .trim();

        if (subtitle) {
          obj.subtitle = subtitle;
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
        boys: getLetterIndexesAndAlhpabet(boysNamesList),
        girls: getLetterIndexesAndAlhpabet(girlsNamesList),
        middle: getLetterIndexesAndAlhpabet(middleNamesList),
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

import cheerio from 'cheerio';
import fetch from 'node-fetch';
import createUUID from '../utils/createUUID';
import { writeFileAsync } from '../utils/fileHelpers';

const CHEERIO_OPTIONS = { normalizeWhitespace: true };

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
    .map(async (i, el) => {
      if (el.children.length === 0) return;

      const name = $(el.children[0])
        .text()
        .trim();
      const declesions = await getNameDeclension(name);
      const obj = {
        id: createUUID(name),
        name,
        subtitle: '',
        declesions,
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
      const $ = cheerio.load(html, CHEERIO_OPTIONS);
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
 * Parses first response from Árnastofnun.
 * It Gets ID for the current name to make the next request
 *
 * @param {Function} $ - Cheerio function reference
 * @param {Object<Cheerio>} ul - Cherrio object
 * @returns {Number|null} responseVal
 */
function parseNameDeclensionFirstResponse($, ul) {
  let responseVal = null;

  ul.each((i, li) => {
    const arr = $(li)
      .text()
      .trim()
      .toLowerCase()
      .split(' ');

    if (arr.includes('karlmannsnafn') || arr.includes('kvenmannsnafn')) {
      const onClickAttrVal = $(li)
        .find('a')
        .attr('onclick');

      responseVal = onClickAttrVal.match(/\d+/g)[0];
    }
  });

  return responseVal;
}

/**
 * Parses name declesions (Beygingar) from html
 *
 * @param {String} html - HTML string
 * @returns {Array<String>} declesionArr
 */
function parseNameDeclensions(html) {
  const declesionArr = [];
  const $ = cheerio.load(html, CHEERIO_OPTIONS);
  const elements = $('.row-fluid div:first-child .VO_beygingarmynd');

  if (elements.length > 0) {
    elements.each((i, el) => {
      declesionArr[i] = $(el).text();
    });
  }

  return declesionArr;
}

/**
 * Parses, prepares and request name declension data
 *
 * @param {String} html - HTML string
 * @returns {Array<String>|null|Error}
 */
async function prepareNameDeclension(html) {
  let responseVal = null;

  try {
    const $ = cheerio.load(html, CHEERIO_OPTIONS);
    const ul = $('ul li');

    if (ul.length > 0) {
      const id = parseNameDeclensionFirstResponse($, ul);
      const url = `http://dev.phpbin.ja.is/ajax_leit.php?q=&id=${id}`;
      const nextHtml = await fetchHTML(url);
      responseVal = parseNameDeclensions(nextHtml);
    } else {
      responseVal = parseNameDeclensions(html);
    }

    return responseVal;
  } catch (error) {
    return error;
  }
}

/**
 * Fetches HTML for Icelandic name declesion (fallbeygingar)
 *
 * @param {String} name - Name string
 * @returns {Array<String>}
 * @example fetchNameDeclension('Snær') => [´Snær´, ´Snæ´, ´Snæ´, ´Snæs´]
 */
async function getNameDeclension(name) {
  try {
    const url = `http://dev.phpbin.ja.is/ajax_leit.php?q=${encodeURIComponent(name)}`;
    const html = await fetchHTML(url);
    const parsedHTML = await prepareNameDeclension(html);
    return parsedHTML;
  } catch (error) {
    return null;
  }
}

/**
 * Fetches HTML string from desired page
 *
 * @param {String} url - Website url
 * @returns {String} HTML string
 */
async function fetchHTML(url) {
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
export default async function initScraper() {
  try {
    const url =
      'https://www.island.is/mannanofn/leit-ad-nafni/?Nafn=&Stulkur=on&Drengir=on&Millinofn=on';
    const html = await fetchHTML(url);
    const data = await parseHtml(html);
    await writeFileAsync('./data/names.json', JSON.stringify(data));
    return true;
  } catch (error) {
    throw new Error(error);
  }
}

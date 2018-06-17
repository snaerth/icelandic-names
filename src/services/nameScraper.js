import cheerio from 'cheerio';
import getNameDeclension from './declensionScraper';
import fetchHTML from '../utils/fetchHtml';
import createUUID from '../utils/createUUID';
import { writeFileAsync } from '../utils/fileHelpers';
import delayPromiseBatches from '../utils/delayPromiseBatches';

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
    .map((i, el) => {
      if (el.children.length === 0) return;

      const name = $(el.children[0])
        .text()
        .trim();
      const obj = {
        id: createUUID(name),
        name,
        verdict: null,
        declesions: null,
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
function parseNamesHtml(html) {
  return new Promise(async (resolve, reject) => {
    try {
      const $ = cheerio.load(html, CHEERIO_OPTIONS);
      const nameTypeList = $('.nafnalisti .nametype');
      const boysNamesObj = $(nameTypeList[0]).find('ul.dir li');
      const girlsNamesObj = $(nameTypeList[1]).find('ul.dir li');
      const middleNamesObj = $(nameTypeList[2]).find('ul.dir li');
      let boysNamesList = getDataFromList($, boysNamesObj);
      let girlsNamesList = getDataFromList($, girlsNamesObj);
      let middleNamesList = getDataFromList($, middleNamesObj);
      const boysLen = boysNamesList.length;
      const girlsLen = girlsNamesList.length;
      const middleLen = middleNamesList.length;
      const mergedList = [...boysNamesList, ...girlsNamesList, ...middleNamesList];
      // Add declesions to items in list
      console.log('TempList before');
      const tempList = await getNameDeclesionsForList(mergedList);
      console.log('TempList after');

      // Split list up again. Now with declesions
      boysNamesList = tempList.splice(0, boysLen);
      girlsNamesList = tempList.splice(boysLen, boysLen + girlsLen);
      middleNamesList = tempList.splice(boysLen + girlsLen, boysLen + girlsLen + middleLen);

      return resolve({
        boys: getLetterIndexesAndAlhpabet(boysNamesList),
        girls: getLetterIndexesAndAlhpabet(girlsNamesList),
        middle: getLetterIndexesAndAlhpabet(middleNamesList),
      });
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
}

/**
 * Gets name declesions for every name in list and
 * returns list with new gotten name declesions property
 *
 * @param {Array<Object>} list - Array of objects
 * @returns {Array<Object>}
 */
async function getNameDeclesionsForList(list) {
  try {
    const chunkSize = 100;
    const promises = [];

    // Iterate list and create multiple promises
    for (let i = 0; i < list.length; i += 1) {
      const name = list[i].name;
      promises.push(getNameDeclension(name));
    }

    const declesionsList = await delayPromiseBatches(promises, chunkSize, 100);

    for (let i = 0; i < declesionsList.length; i += 1) {
      if (Array.isArray(declesionsList[i]) && declesionsList[i].length > 0) {
        list[i].declesions = declesionsList[i];
      }
    }

    return list;
  } catch (error) {
    return new Error(error);
  }
}

/**
 * Initializes Icelandic names scraper
 */
export default async function initScraper() {
  // const test = await getNameDeclension('marteinn');
  // console.log('test', test);
  // return;
  try {
    const url =
      'https://www.island.is/mannanofn/leit-ad-nafni/?Nafn=&Stulkur=on&Drengir=on&Millinofn=on';
    const html = await fetchHTML(url);
    const data = await parseNamesHtml(html);
    await writeFileAsync('./data/names.json', JSON.stringify(data));
    return true;
  } catch (error) {
    throw new Error(error);
  }
}

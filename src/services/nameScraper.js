import cheerio from 'cheerio';
import getDeclensionByName from '../database/icelandic';
import fetchHTML from '../utils/fetchHtml';
import createUUID from '../utils/createUUID';
import { writeFileAsync } from '../utils/fileHelpers';
import splitToChunks from '../utils/splitToChunks';

const CHEERIO_OPTIONS = { normalizeWhitespace: true };

/**
 * Creates letter indexes and alhpabet array
 * @param {Array} list - list of names object
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
      let returnValue;

      if (el.children.length > 0) {
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

        returnValue = obj;
      }

      return returnValue;
    })
    .toArray();
}

/**
 * Gets name declesions for every name in list and
 * returns list with new property declesions
 *
 * @param {Array<Object>} list - Array of objects
 * @returns {Array<Object>}
 */
async function getNameDeclesionsForList(list) {
  const arr = list;
  const promisesArr = [];
  const valuesArr = [];

  try {
    // Create all promises
    for (let i = 0; i < arr.length; i += 1) {
      promisesArr.push(getDeclensionByName(arr[i].name));
    }

    // Split promises into array chunks with 10 items in each chunk
    const promisesChunks = splitToChunks(promisesArr, 10);

    // Execute parallel 10 promises at a time and
    // wait for each chunk to finish.
    // By doing this we minimize load on the server
    for (let i = 0; i < promisesChunks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const tempValues = await Promise.all(promisesChunks[i]);

      for (let j = 0; j < tempValues.length; j += 1) {
        valuesArr.push(tempValues[j]);
      }
    }

    // Add values from promises to arr
    for (let i = 0; i < valuesArr.length; i += 1) {
      arr[i].declesions = valuesArr[i];
    }

    return arr;
  } catch (error) {
    return new Error(error);
  }
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
      const tempList = await getNameDeclesionsForList(mergedList);

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
      return reject(error);
    }
  });
}

/**
 * Initializes Icelandic names scraper
 */
export default async function initScraper() {
  try {
    const url = 'https://www.island.is/mannanofn/leit-ad-nafni/?Nafn=&Stulkur=on&Drengir=on&Millinofn=on';
    const html = await fetchHTML(url);
    const data = await parseNamesHtml(html);
    await writeFileAsync('./data/names.json', JSON.stringify(data));
    return true;
  } catch (error) {
    throw new Error(error);
  }
}

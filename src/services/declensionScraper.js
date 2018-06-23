import cheerio from 'cheerio';
import fetchHTML from '../utils/fetchHtml';

const CHEERIO_OPTIONS = { normalizeWhitespace: true };

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

      responseVal = onClickAttrVal.match(/\d+/g);
    }
  });

  return responseVal[0];
}

/**
 * Gets declesions html table row
 * @param {String|Number} trChild - HTML table row number
 * @returns {String}
 */
function getTableRowHtml(trChild) {
  return `.row-fluid div:first-child tr:nth-child(${trChild}) td:nth-child(2) .VO_beygingarmynd`;
}

/**
 * Checks if there are two values in row
 * and parses value from object
 *
 * @param {Function} $ - Cheerio function reference
 * @param {Object} el - Cheerio object instance
 * @returns {String}
 */
function getValuesFromRow($, el) {
  let rowValue = [];

  if (el.length > 1) {
    $(el).each((i, e) => {
      rowValue.push($(e).text());
    });

    rowValue = rowValue.length > 1 ? rowValue.join(' / ') : rowValue;
  } else {
    rowValue = el.text();
  }
  return rowValue;
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
  // Get declesions table row objects
  const nfEl = $(getTableRowHtml(4));
  const þfEl = $(getTableRowHtml(5));
  const þgfEl = $(getTableRowHtml(6));
  const efEl = $(getTableRowHtml(7));
  // Parse text from
  const nf = getValuesFromRow($, nfEl);
  const þf = getValuesFromRow($, þfEl);
  const þgf = getValuesFromRow($, þgfEl);
  const ef = getValuesFromRow($, efEl);

  if (nf && þf && þgf && ef) {
    declesionArr.push(nf, þf, þgf, ef);
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
      let nextHtml = null;

      if (id) {
        const url = `http://dev.phpbin.ja.is/ajax_leit.php?q=&id=${id}`;
        nextHtml = await fetchHTML(url);
      }

      responseVal = nextHtml ? parseNameDeclensions(nextHtml) : null;
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
 * @example getNameDeclension('Snær') => [´Snær´, ´Snæ´, ´Snæ´, ´Snæs´]
 */
export default async function getNameDeclension(name) {
  try {
    const url = `http://dev.phpbin.ja.is/ajax_leit.php?q=${encodeURIComponent(name)}`;
    const html = await fetchHTML(url);
    const parsedHTML = await prepareNameDeclension(html);
    return parsedHTML;
  } catch (error) {
    return null;
  }
}

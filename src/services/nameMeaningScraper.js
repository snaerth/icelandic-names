import cheerio from 'cheerio';
import fetchHTML from '../utils/fetchHtml';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';

const CHEERIO_OPTIONS = { normalizeWhitespace: true };

/**
 * Parses html for name meanings
 *
 * @param {String} html - HTML string
 * @returns {Array<Object>}
 */
function parseHTML(html) {
  return new Promise(async (resolve, reject) => {
    try {
      const returnList = [];
      const $ = cheerio.load(html, CHEERIO_OPTIONS);
      const arr = $('ul.list.list-men');
      if (arr.length > 0) {
        arr.each((idx, el) => {
          $(el)
            .find('li')
            .each((i, li) => {
              const name = $(li)
                .find('.name')
                .text();
              const meaning = $(li)
                .find('.name-desc')
                .text();

              returnList.push({
                name: capitalizeFirstLetter(name),
                meaning: capitalizeFirstLetter(meaning),
              });
            });
        });
      }

      return resolve(returnList);
    } catch (error) {
      return reject(error);
    }
  });
}

/**
 * Fetches HTML for Icelandic names meanings
 *
 * @returns {Array<Object>}
 */
export default async function getNamesMeaningsList() {
  try {
    const url = 'https://attavitinn.is/uncategorized/merkingar-nafna/';
    const html = await fetchHTML(url);
    const parsedHTML = await parseHTML(html);
    return parsedHTML;
  } catch (error) {
    return null;
  }
}

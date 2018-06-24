// import cheerio from 'cheerio';
// import fetchHTML from '../utils/fetchHtml';

// const CHEERIO_OPTIONS = { normalizeWhitespace: true };

// function parseHTML(html) {
//   const $ = cheerio.load(html, CHEERIO_OPTIONS);
// }

// async function scrapeNameCountFromHagstofan(name) {
//   try {
//     const url = 'https://hagstofa.is/talnaefni/ibuar/faeddir-og-danir/nofn/';
//     const html = await fetchHTML(url);
//     const data = await parseHTML(html);

//     return data;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// export default scrapeNameCountFromHagstofan;

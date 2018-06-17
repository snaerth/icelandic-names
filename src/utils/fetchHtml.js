import fetch from 'node-fetch';

/**
 * Fetches HTML string from desired page
 *
 * @param {String} url - Website url
 * @returns {String} HTML string
 */
export default async function fetchHTML(url) {
  try {
    const res = await fetch(url, { timeout: 3000 });
    const html = await res.text();
    return html;
  } catch (error) {
    return error;
  }
}

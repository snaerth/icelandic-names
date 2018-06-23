import dbQuery from './index';
import parseDeclesionNameRes from '../utils/parseDeclesionNameRes';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';

/**
 * Fetches data from database for Icelandic name declesion (fallbeygingar)
 *
 * @param {String} name - Name string
 * @returns {Array<String>}
 */
export default async function getDeclensionByName(str) {
  try {
    // Get declesion by name
    const { rows } = await dbQuery('SELECT * FROM bin WHERE uppflettiord = $1', [
      capitalizeFirstLetter(str),
    ]);

    // Parse response
    const parsedData = parseDeclesionNameRes(rows);

    return parsedData;
  } catch (error) {
    return new Error(error);
  }
}

/**
 * Splits array into chunks
 * For example splitToChunks([1,2,3,4,5,6,7,8,9], 3)
 *
 * @param {Array} array - Array of anything
 * @param {Number} chunk - Size of chunk
 * @returns {Array<Array>}
 * @example splitToChunks([1,2,3,4,5,6,7,8,9], 3) => [[1,2,3],[4,5,6],[7,8,9]]
 */
export default function splitToChunks(arr, chunk) {
  const chunkArr = [];

  for (let i = 0; i < arr.length; i += chunk) {
    chunkArr.push(arr.slice(i, i + chunk));
  }

  return chunkArr;
}

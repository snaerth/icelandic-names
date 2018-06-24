/**
 * Parses Database query response from table bin
 *
 * @param {Array} row
 * @returns {Array} only containing declesions
 * @example parseDeclesionNameRes(rows) => ['Snær','Snæ', 'Snæ', 'Snæs']
 */
export default function parseDeclesionNameRes(row) {
  const arr = [];

  for (let i = 0; i < row.length; i += 1) {
    const { greiningarstrengur, beygingarmynd } = row[i];

    if (/^NFET$/.test(greiningarstrengur)) {
      arr[0] = beygingarmynd;
    } else if (/^ÞFET$/.test(greiningarstrengur)) {
      arr[1] = beygingarmynd;
    } else if (/^ÞGFET$/.test(greiningarstrengur)) {
      arr[2] = beygingarmynd;
    } else if (/^EFET$/.test(greiningarstrengur)) {
      arr[3] = beygingarmynd;
    }
  }

  return arr;
}

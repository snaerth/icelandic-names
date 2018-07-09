import NamesList from '../data/names.json';

/**
 * Creates PSQL insert statements from names.json
 */
export default function createPSQLInsertStatements() {
  const arr = [];

  Object.keys(NamesList).forEach((key) => {
    const { list } = NamesList[key];

    for (let i = 0; i < list.length; i += 1) {
      const item = list[i];
      const objKeys = Object.keys(item);
      const insertValues = new Array(objKeys.length).fill(0).map((v, idx) => `$${idx + 1}`);
      const values = Object.values(item).map((val) => {
        if (Array.isArray(val)) {
          return JSON.stringify(val);
        }

        return val;
      });

      const insert = `INSERT into names (${objKeys.join(',')}) VALUES(${insertValues})`;
      const obj = {
        insert,
        values,
      };

      arr.push(obj);
    }
  });

  return arr;
}

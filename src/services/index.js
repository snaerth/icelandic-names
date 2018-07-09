import dbQuery from '../database';
import initScraper from './nameScraper';
import createPSQLInsertStatements from './createPSQLInsertStatements';

/**
 * Starts scaping data for Icelandic names and saves names to database
 */
export default async function startScaper() {
  await initScraper();
  /* eslint-disable-next-line no-console */
  console.log('Icelandic name scraper finished scaping data at: ', new Date().toDateString());
  const insertStatements = createPSQLInsertStatements();

  await Promise.all(
    insertStatements.map(async (statement) => {
      const { insert, values } = statement;
      const response = await dbQuery(insert, values);
      /* eslint-disable-next-line no-console */
      console.log(response);
    }),
  );

  /* eslint-disable-next-line no-console */
  console.log('Finished inserting data to database at: ', new Date().toDateString());
}

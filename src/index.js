import express from 'express';
import cron from 'cron';
import { readFileAsync } from './utils/fileHelpers';
import initScraper from './services/nameScraper';

process.env = JSON.parse(JSON.stringify(process.env));

const app = express();
const { CronJob } = cron;

// Tasks runs job as soon as it ticks over to the new month at 00:00 hours
CronJob(
  '0 0 1 * *',
  async () => {
    await initScraper();
    // eslint-disable-next-line
    console.log('Icelandic name scraper finished scaping data at: ', new Date().toDateString());
  },
  null,
  true,
  'Atlantic/Reykjavik',
);

initScraper();

/**
 * Gets all names
 */
app.get('/names', async (req, res) => {
  try {
    const data = await readFileAsync('./data/names.json');

    return res.status(200).json(JSON.parse(data));
  } catch (error) {
    // If names.json dosen't exist
    if (error.code === 'ENOENT') {
      const data = await readFileAsync('./data/names_backup.json');

      return res.status(200).json(JSON.parse(data));
    }

    return res.status(500).json('Ups.. something went wrong');
  }
});

/**
 * Gets all boys names
 */
app.get('/names/boys', async (req, res) => {
  try {
    const data = await readFileAsync('./data/names.json');
    const parsedData = JSON.parse(data);
    return res.status(200).json(parsedData.boys);
  } catch (error) {
    // If names.json dosen't exist
    if (error.code === 'ENOENT') {
      const data = await readFileAsync('./data/names_backup.json');
      const parsedData = JSON.parse(data);
      return res.status(200).json(parsedData.boys);
    }

    return res.status(500).json('Ups.. something went wrong');
  }
});

/**
 * Gets all girls names
 */
app.get('/names/girls', async (req, res) => {
  try {
    const data = await readFileAsync('./data/names.json');
    const parsedData = JSON.parse(data);
    return res.status(200).json(parsedData.girls);
  } catch (error) {
    // If names.json dosen't exist
    if (error.code === 'ENOENT') {
      const data = await readFileAsync('./data/names_backup.json');
      const parsedData = JSON.parse(data);
      return res.status(200).json(parsedData.girls);
    }

    return res.status(500).json('Ups.. something went wrong');
  }
});

/**
 * Gets all middle names
 */
app.get('/names/middle', async (req, res) => {
  try {
    const data = await readFileAsync('./data/names.json');
    const parsedData = JSON.parse(data);
    return res.status(200).json(parsedData.middle);
  } catch (error) {
    // If names.json dosen't exist
    if (error.code === 'ENOENT') {
      const data = await readFileAsync('./data/names_backup.json');
      const parsedData = JSON.parse(data);
      return res.status(200).json(parsedData.middle);
    }

    return res.status(500).json('Ups.. something went wrong');
  }
});

// eslint-disable-next-line
app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));

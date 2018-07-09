import express from 'express';
import path from 'path';
import { readFileAsync } from './utils/fileHelpers';
// import startScaper from './services';

process.env = JSON.parse(JSON.stringify(process.env));

const app = express();

// IFEE to execute scaper
// Uncomment code to run scaper
// (async () => await startScaper())();

/**
 * Gets all names
 */
app.get('/names', async (req, res) => {
  try {
    const data = await readFileAsync(path.join(process.cwd(), 'src', 'data', 'names.json'));
    return res.status(200).json(JSON.parse(data));
  } catch (error) {
    // If names.json dosen't exist
    if (error.code === 'ENOENT') {
      const data = await readFileAsync(
        path.join(process.cwd(), 'src', 'data', 'names_backup.json'),
      );

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
    const data = await readFileAsync(path.join(process.cwd(), 'src', 'data', 'names.json'));
    const parsedData = JSON.parse(data);
    return res.status(200).json(parsedData.boys);
  } catch (error) {
    // If names.json dosen't exist
    if (error.code === 'ENOENT') {
      const data = await readFileAsync(
        path.join(process.cwd(), 'src', 'data', 'names_backup.json'),
      );
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
    const data = await readFileAsync(path.join(process.cwd(), 'src', 'data', 'names.json'));
    const parsedData = JSON.parse(data);
    return res.status(200).json(parsedData.girls);
  } catch (error) {
    // If names.json dosen't exist
    if (error.code === 'ENOENT') {
      const data = await readFileAsync(
        path.join(process.cwd(), 'src', 'data', 'names_backup.json'),
      );
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
    const data = await readFileAsync(path.join(process.cwd(), 'src', 'data', 'names.json'));
    const parsedData = JSON.parse(data);
    return res.status(200).json(parsedData.middle);
  } catch (error) {
    // If names.json dosen't exist
    if (error.code === 'ENOENT') {
      const data = await readFileAsync(
        path.join(process.cwd(), 'src', 'data', 'names_backup.json'),
      );
      const parsedData = JSON.parse(data);
      return res.status(200).json(parsedData.middle);
    }

    return res.status(500).json('Ups.. something went wrong');
  }
});

// eslint-disable-next-line
app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));

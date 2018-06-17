import splitToChunks from '../utils/splitToChunks';

export default async function delayPromiseBatches(promises, chunkSize, delayMs) {
  try {
    const promisesInChunks = splitToChunks(promises, chunkSize);
    const resolvedPromiseChunks = [];

    for (let i = 0; i < promisesInChunks.length; i += 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
      const tempChunkValues = await Promise.all(promisesInChunks[i]);
      resolvedPromiseChunks.push(tempChunkValues);
      console.log(i, promisesInChunks[i].length);
    }

    const mergedList = [].concat.apply([], resolvedPromiseChunks);
    return mergedList;
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
}

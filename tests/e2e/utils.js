/**
 * @template T
 * @param {() => Promise<T>} fn
 * @param {number} times
 * @return {Promise<T>}
 */
export const retryTimes = async (fn, times) => {
  let tries = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      // eslint-disable-next-line no-await-in-loop
      return await fn();
    } catch (err) {
      if (++tries >= times) {
        throw err;
      }
    }
  }
};

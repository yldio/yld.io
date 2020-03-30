/**
 * @template T
 * @param {() => Promise<T>} fn
 * @param {number} times
 * @return {Promise<T>}
 */
export const retryTimes = async (fn, times) => {
  let tries = 0;
  while (true) {
    try {
      return await fn();
    } catch (err) {
      if (++tries >= times) {
        throw err;
      }
    }
  }
};

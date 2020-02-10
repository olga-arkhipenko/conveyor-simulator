export const sleep = async ms =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate an array of indices up to the given `count`.
 * @param {number} count - upper limit of the index range.
 */
export const indexRange = count => Array(count).map((_, idx) => idx);

export const sleep = async ms =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate an array of indices up to the given `count`.
 *
 * @param {number} count - upper limit of the index range.
 * @returns {number[]} - number range from 0 to count.
 */
export const indexRange = count =>
  Array(count)
    .fill()
    .map((_, idx) => idx);

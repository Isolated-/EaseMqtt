/**
 *  Test if a value is empty or not
 *  @param {string | object | any[]} value the value to test
 *  @return {boolean} true if value is empty
 */
export const isEmpty = (value: string | object | any[]): boolean => {

  if (!value) return true;

  if (typeof (value) === 'object') {
    return Object.keys(value).length === 0;
  }

  return value.length === 0;
};

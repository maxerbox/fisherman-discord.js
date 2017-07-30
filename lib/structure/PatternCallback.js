/**
 * A class used for the pattern callback matching
 * @abstract
 * @class PatternCallback
 */
class PatternCallback {
  /**
   * Creates an instance of PatternCallback.
   * @memberof PatternCallback
   */
  constructor () {
    if (new.target === PatternCallback) throw new TypeError('Cannot construct Abstract instances directly')
  }
    /**
     * Used to match with the suffix, if true is returned with validate, the command is matched
     * @example validate(false);
     * @param {string} suffix the suffix of the command
     * @param {function} validate A callback, where you have to return true or false
     * @memberof PatternCallback
     */
  test (suffix, validate) {

  }
    /**
     * Used to capture all the parameters
     * @example callback({});
     * @param {string} suffix the suffix of the command
     * @param {function} callback A callback, where you have to return the captured parameters
     * @memberof PatternCallback
     */
  exec (suffix, callback) {

  }
}
module.exports = PatternCallback

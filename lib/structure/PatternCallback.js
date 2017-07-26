/**
 * A class used for the pattern callback matching
 * @abstract
 * @class PatternCallback
 */
class PatternCallback {
  constructor () {
    if (new.target === PatternCallback) throw new TypeError('Cannot construct Abstract instances directly')
  }
    /**
     *
     * @example callback(false);
     * @param {(string} suffix the suffix of the command
     * @param {function} callback A callback, where you have to return true or false
     * @memberof PatternCallback
     */
  test (suffix, callback) {

  }
    /**
     *
     * @example callback({});
     * @param {(string)} suffix the suffix of the command
     * @param {function} callback A callback, where you have to return the captured parameters
     * @memberof PatternCallback
     */
  exec (suffix, callback) {

  }
}
module.exports = PatternCallback

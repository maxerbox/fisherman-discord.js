
/**
 * Some utils to escape prefixes
 *
 * @class RegExpEscape
 */
class RegExpEscape {
    /**
     *
     *
     * @static
     * @param {string} str
     * @returns {string}
     * @memberof RegExpEscape
     */
  static escapeString (str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
  }
    /**
     *
     *
     * @static
     * @param {Array.string} array
     * @returns {Array.string}
     * @memberof RegExpEscape
     */
  static escapeArray (array) {
    return array.map(function (value) {
      return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
    })
  }
}
module.exports = RegExpEscape

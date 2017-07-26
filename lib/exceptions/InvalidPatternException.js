/**
 * When a pattern is not respected, of a command
 *
 * @class InvalidPatternException
 * @extends {Error}
 */
class InvalidPatternException extends Error {
    /**
     * Creates an instance of InvalidPatternException.
     * @param {string} suffixe The command's suffixe
     * @memberof InvalidPatternException
     */
  constructor (suffixe = null) {
    super('Pattern not matching with suffixe: ' + suffixe)
        /**
         * The suffixe that doesn't match
         * @type {string}
         * @name InvalidPatternException#suffixe
         * @readonly
         */
    this.suffixe = suffixe
        /**
         * The fisherCode
         * @readonly
         * @constant
         * @name InvalidPatternException#code
         * @type {number}
         * @default 303
         */
    this.code = 303
  }
}
module.exports = InvalidPatternException

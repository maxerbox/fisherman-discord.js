/**
 * When a command is not found
 * @class CommandNotFoundException
 * @extends {Error}
 */
class CommandNotFoundException extends Error {
    /**
     * Creates an instance of CommandNotFoundException.
     * @param {string} command the command
     * @memberof CommandNotFoundException
     */
  constructor (command) {
    super('The following command was not found: ' + command)
        /**
         * The unknown command
         * @type {string}
         * @name CommandNotFoundException#command
         * @readonly
         */
    this.command = command
        /**
         * The fisherCode
         * @readonly
         * @constant
         * @name CommandNotFoundException#code
         * @type {number}
         * @default 404
         */
    this.code = 404
  }
}
module.exports = CommandNotFoundException

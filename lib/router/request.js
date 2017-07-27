/**
 * @class FisherRequest
 */
class FisherRequest {
    /**
     * Creates an instance of FisherRequest.
     * @param {Fisherman} client
     */
  constructor (client) {
        /**
         * is it a command
         * @name FisherRequest#isCommand
         * @type {boolean}
         * @default false
         * @readonly
         */
    this.isCommand = false
        /**
         * the command if there is one
         * @name FisherRequest#command
         * @type {Command}
         * @default null
         */
    this.command = null
        /**
         * the register of the command
         * @name FisherRequest#register
         * @type {FisherRegister}
         * @default null
         */
    this.register = null
        /**
         * the prefix trigered
         * @name FisherRequest#prefix
         * @type {string}
         * @default null
         */
    this.prefix = null
        /**
         * The discord.js channel
         * @name FisherRequest#channel
         * @type {GuildChannel}
         * @default null
         */
    this.channel = null
        /**
         * The dicord.js message
         * @name FisherRequest#message
         * @type {Message}
         * @default null
         */
    this.message = null
        /**
         * The Fisherman client
         * @name FisherRequest#client
         * @type {Fisherman}
         */
    Object.defineProperty(this, 'client', { value: client })
  }
}
module.exports = FisherRequest

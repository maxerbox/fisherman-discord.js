/**
 * When the channel type is not the one defined for the command
 *
 * @class InvalidChannelException
 * @extends {Error}
 */
class InvalidChannelException extends Error {
    /**
     * Creates an instance of InvalidChannelException.
     * @param {string} [channel=null] The channel type. See https://discord.js.org/#/docs/main/stable/class/Channel?scrollTo=type
     * @memberof InvalidChannelException
     */
  constructor (channel = null) {
    super('The command must be executed in the channel: ' + channel)
        /**
         * The channel type required
         * @type {string}
         * @name InvalidChannelException#channelRequired
         * @readonly
         */
    this.channelRequired = channel
        /**
         * The fisherCode
         * @readonly
         * @constant
         * @name InvalidChannelException#code
         * @type {number}
         * @default 400
         */
    this.code = 400
  }
}
module.exports = InvalidChannelException

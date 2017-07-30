/**
 * An abstract class, used to append commands to a register. This class has to be extended
 * @abstract
 * @class Command
 */
class Command {
    /**
     * Creates an instance of Command.
     * @param {string} [name=null] The command's name
     * @param {FisherRegister} [register=null] The command's register
     * @memberof Command
     */
  constructor (name, register) {
        /**
         * The command's name
         * @type {string}
         * @name Command#name
         * @default null
         */
    this.name = name
        /**
         * The command's name
         * @type {string}
         * @name Command#register
         * @default null
         */
    this.register = register
        /**
         * A regPattern, to match with the command suffixe
         * @type {RegExp}
         * @name Command#regPattern
         * @default null
         */
    this.regPattern = null
        /**
         * A patterncallback to match with middleware
         * @type {patternCallback}
         * @name Command#patternCallback
         * @default null
         */
    this.patternCallback = null
        /**
         * The perm(s) required to send a invalid permission fisher code
         * @type {(string|string[])}
         * @name Command#discordSpecialPerms
         * @default ["SEND_MESSAGES"]
         */
    this.discordSpecialPerms = ['SEND_MESSAGES']
        /**
         * The perm(s) required to execute the command
         * @type {(string|string[])}
         * @name Command#discordPermRequired
         * @default []
         */
    this.discordPermRequired = []
        /**
         * The channel type(s) where the command can be executed
         * @type {(string|string[])}
         * @name Command#channelType
         * @default [dm,"group","text"]
         */
    this.channelType = ['dm', 'group', 'text']
        /**
         * An object to store data for middlewares, or for commands
         * @type {Object}
         * @name Command#locales
         * @default Object()
         */
    this.locales = {}
        /**
         * An alias or an array of alias for the command
         * @type {(string|string[])}
         * @name Command#aliases
         * @default null
         */
    this.aliases = null
        /**
         * If true, a fisherPromiseCallback is passed to the execute function instead of a fisherCallback
         * @type {boolean}
         * @name Command#isPromise
         * @default false
         */
    this.isPromise = false
  }
    /**
     *
     *
     * @param {fisherRequest} req The command's request
     * @param {fisherResponse} res The command's response
     * @param {Promise.resolve} [resolve] (Only if isPromise is set to "true") A Promise.resolve function. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Objets_globaux/Promise/resolve
     * @param {Promise.reject} [reject] (Only if isPromise is set to "true") A Promise.reject function. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject
     * @memberof Command
     */
  execute (req, res, resolve, reject) {

  }
}
module.exports = Command

const defaultCommandOptions = require('./util/defaultCommandOptions')
/**
 * A register, to add commands to fisherman extending the Map class
 * @class FisherRegister
 * @extends {Map}
 */
class FisherRegister extends Map {
    /**
     * Creates an instance of FisherRegister.
     * @param {fisherman} client
     * @param {string} [name=null]
     * @param {string} [desc=null]
     * @memberof FisherRegister
     */
  constructor (client, name = null, desc = null) {
    super()
    if (!client) throw new TypeError('Client not defined')
      /**
       * The fisherman client that instantied the register
       * @name FisherRegister#client
       * @type {Fisherman}
       */
    this.client = client
        /**
         * The register description, used by commands, like "help"
         * @name FisherRegister#description
         * @type {string}
         * @default null
         */
    this.description = desc
        /**
         * The register name, used by commands, like "help"
         * @name FisherRegister#name
         * @type {string}
         * @default null
         */
    this.name = name
  }
    /**
     * A text command that can be only executed in a guild
     * @example textCommand("cat", null, function(req,res) {});
     * @param {string} name The command's name
     * @param {DefaultCommandOptions} [options={}] An option object, that will be asigned with defaultCommandOptions
     * @param {FisherCallback} callback A FisherCallback
     */
  textCommand (name, options, callback) {
    if (typeof callback !== 'function') { throw new TypeError('Callback must be a function') }
    if (typeof name !== 'string') {
      throw new TypeError('Command name must be a string')
    }
    var cmd = Object.create(defaultCommandOptions)
    cmd.register = this
    cmd.channelType = 'text'
    cmd.execute = callback.bind(cmd)
    cmd.name = name
    cmd = Object.assign(cmd, options)
    this.set(name, cmd)
  }
    /**
     * A command, specified by the name and the scope.
     * @example command(["dm", "text"], "cat", null, function(req, res){});
     * @param {(string[]|string)} scope The channel type, can be an array or a string
     * @param {string} name The command's name
     * @param {DefaultCommandOptions} [options={}] An option object, that will be asigned with DefaultCommandOptions
     * @param {FisherCallback} callback A FisherCallback
     * @memberof FisherRegister
     */
  command (scope, name, options, callback) {
    if (!Array.isArray(scope) || !(typeof scope === 'string')) { throw new TypeError('scope must be a string or an array') }
    if (typeof callback !== 'function' || typeof name !== 'string') { throw new TypeError('Callback must be a function, command name must be a string') }

    var cmd = Object.create(defaultCommandOptions)
    cmd.register = this
    cmd.channelType = scope
    cmd.execute = callback.bind(cmd)
    cmd.name = name
    cmd = Object.assign(cmd, options)
    this.set(name, cmd)
  }
  /**
   * A command, that can be resolved/rejected. It triggers fishercodes when it's resolved/rejected
   * @example command(["dm", "text"], "cat", null, function(req, res, resolve, reject){});
   * @param {(string[]|string)} scope The channel type, can be an array or a string
   * @param {string} name The command's name
   * @param {DefaultCommandOptions} [options={}] An option object, that will be asigned with DefaultCommandOptions
   * @param {FisherPromiseCallback} callback A FisherPromiseCallback
   * @memberof FisherRegister
   */
  promiseCommand (scope, name, options, callback) {
    if (!(Array.isArray(scope) || typeof scope === 'string')) { throw new TypeError('scope must be a string or an array') }
    if (typeof callback !== 'function' || typeof name !== 'string') { throw new TypeError('Callback must be a function, command name must be a string') }
    var cmd = Object.create(defaultCommandOptions)
    cmd.register = this
    cmd.isPromise = true
    cmd.channelType = scope
    cmd.execute = callback.bind(cmd)
    cmd.name = name
    cmd = Object.assign(cmd, options)
    this.set(name, cmd)
  }
    /**
     * Add a command to fisherman, through an object or an command class extending the abstract class "Command"
     *
     * @param {string} name The command's name, used as key in the command map
     * @param {(Object|Command)} command An object, or a class extending the abstract class "Command"
     * @memberof FisherRegister
     */
  addCommand (name, command) {
    var cmd = Object.assign(Object.create(defaultCommandOptions), command)
    this.set(name, cmd)
  }
  set (key, value) {
    /**
     * Emitted when a new command is added
     * @event Fisherman#commandAdded
     * @param {Command}
     */
    super.set(key, value)
    this.client.commands.set(key, value)
    this.client.emit('commandAdded', value)
    this.setAliases(key, value)
  }
    /**
     * set the aliases for the fisher client
     * @private
     * @param {string} key
     * @param {Object} value
     * @memberof FisherRegister
     */
  setAliases (key, value) {
    if (typeof value.aliases === 'string') {
      this.client.aliases.set(value.aliases, key)
    } else if (Array.isArray(value.aliases)) {
      var i
      for (i in value.aliases) {
        this.client.aliases.set(value.aliases[i], key)
      }
    }
  }
    /**
     * delete the aliases for the given command/key
     * @private
     * @param {string} key
     * @memberof FisherRegister
     */
  clearAliases (key) {
    var cmd = super.get(key)
    if (cmd) {
      if (typeof cmd.aliases === 'string') {
        this.client.aliases.delete(cmd.aliases)
      } else if (Array.isArray(cmd.aliases)) {
        var i
        for (i in cmd.aliases) {
          this.client.aliases.delete(cmd.aliases[i])
        }
      }
    }
  }
  delete (key) {
    this.clearAliases(key)
    super.delete(key)
    this.client.commands.delete(key)
  }
}
module.exports = FisherRegister
/**
 * @typedef {function} FisherCallback The command's execution function
 * @param {fisherRequest} req A request object
 * @param {fisherResponse} res A response object
 */
/**
 * @typedef {function} FisherPromiseCallback The promise command's execution function with a promise callback
 * @param {fisherRequest} req A request object
 * @param {fisherResponse} res A response object
 * @param {function} resolve A promise resolve function
 * @param {function} reject A promise reject function
 */

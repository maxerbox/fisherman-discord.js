/**
 * The main fisherman class, to create commands and interact with them
 * @author Maxerbox | Simon Sassi 2017
 * @extends {EventEmitter}
 * @class Fisherman
 */
const async = require('async')
const FisherRegister = require('./register.js')
const defaultFisherOpts = require('./util/FishermanOptions')
const escapeRegExp = require('./util/RegExpEscape')
var fisherRouter = require('./router/router')
const EventEmitter = require('events')
const fisherCodes = require('./util/FisherCodes')
const CommandNotFoundException = require('./exceptions/CommandNotFoundException')
const InvalidChannelException = require('./exceptions/InvalidChannelException')
const InvalidPatternException = require('./exceptions/InvalidPatternException')
const MissingPermissionsException = require('./exceptions/MissingPermissionsException')

class Fisherman extends EventEmitter {
    /**
     * Creates an instance of Fisherman.
     * @param {FishermanOptions} options The options for fisherman
     * @memberof Fisherman
     */
  constructor (options = {}) {
    super()
        /**
         * Used to instantiate the FisherRouter
         * @name Fisherman#fisherRouterPrototype
         * @type {FisherRouter}
         */
    this.fisherRouterPrototype = fisherRouter
        /**
         * The middleware handling function stack
         * @private
         * @name Fisherman#handleListeners
         * @type {Array}
         */
    this.handleListeners = []
        /**
         * The middleware function stack on init
         * @private
         * @name Fisherman#messageListeners
         * @type {Array}
         */
    this.setUpListeners = []
        /**
         * All the commands handled by fisherman
         * @name Fisherman#commands
         * @type {Map.<string, Command>}
         */
    this.commands = new Map()
        /**
         * All the command aliases handled by fisherman
         * @name Fisherman#aliases
         * @type {Map.<string, Command>}
         */
    this.aliases = new Map()
        /**
         * All the command registers handled by fisherman
         * @name Fisherman#registers
         * @type {Map.<string, FisherRegister>}
         */
    this.registers = new Map()
        /**
         * A fastfall empty callback
         * @private
         * @name Fisherman#fallHandle
         */
    this.fallHandle = require('fastfall')(this.handleListeners)
    this.setOptions(options)
    if (!this.client) { this.client = new (require('discord.js')).Client(this.clientOptions) }
  }
    /**
     * Set the options to fisherman
     *
     * @param {FishermanOptions} options
     * @memberof Fisherman
     */
  setOptions (options) {
    var opts = Object.assign(defaultFisherOpts, options)
    if (opts.client) { this.client = opts.client }
    if (opts.prefixes) { this.setPrefixe(opts.prefixes) }
    this.commandMatchRegExp = new RegExp(opts.commandMatchRegExp)
    this.ownerID = opts.ownerID
    this.clientOptions = options.clientOptions
    this.sendAliasStatus = opts.sendAliasStatus
    this.sendNotFoundStatus = opts.sendNotFoundStatus
    this.selfMessageProcessing = opts.selfMessageProcessing
  }

    /**
     *
     * Set the prefixe
     * @param {(Array|string)} prefixes
     * @memberof Fisherman
     */
  setPrefixe (prefixes) {
    if (typeof prefixes === 'string') {
      this.regPref = new RegExp('^(' + escapeRegExp.escapeString(prefixes) + ').*')
    } else if (Array.isArray(prefixes)) {
      var escapedArray = escapeRegExp.escapeArray(prefixes)
      this.regPref = new RegExp('^(' + escapedArray.join('|') + ').*')
    }
  }
    /**
     * Create a Fisherman instance from an already logged in discord.js client
     *
     * @static
     * @param {Client} client The discord.js client
     * @param {FishermanOptions} fisherOptions The options for Fisherman
     * @memberof Fisherman
     */
  static createFromClient (client, fisherOptions = {}) {
    var opts = Object.assign({ client: client }, fisherOptions)
    return new this(opts)
  }

    /**
     *
     * Message event listener
     * @private
     * @param {Message} message A discord.js Message
     * @memberof Fisherman
     */
  handleMessage (message) {
    if (message.author.id === this.client.user.id && !this.selfMessageProcessing) { return }
    var router = fisherRouter.buildFromMessage(this, message)
    var that = this
    var prefixe = router.request.prefix = this.checkPrefixe(message.content)
    try {
      router.request.command = prefixe ? this.checkCommand(prefixe, message) : null
      if (router.request.command) router.request.isCommand = true
    } catch (err) {
      router.response.sendCode(err.code, err)
      return
    }
    this.fallHandle(router.request, router.response, function (err, request, response) {
      if (err) return err === true ? undefined : router.response.sendCode(fisherCodes.MIDDLEWARE_FAILED, err)
      if (router.request.command) {
        var cmd = router.request.command
        that.matchSuffixe(cmd, cmd.suffixe, function (result) {
          if (result) {
            if (cmd.isPromise) {
              (new Promise(function (resolve, reject) {
                cmd.execute(router.request, router.response, resolve, reject)
              })).then(res => router.response.sendCode(fisherCodes.COMMAND_SUCESS, res)).catch(err => router.response.sendCode(fisherCodes.COMMAND_FAILED, err))
            } else {
              cmd.execute(router.request, router.response)
            }
          } else {
            router.response.sendCode(fisherCodes.INVALID_PATTERN, new InvalidPatternException(cmd.suffixe))
          }
        })
      }
    })
  }

    /**
     * Check if there is a command, throw exceptions
     * @private
     * @param {string} prefixe The command prefixe
     * @param {Message} message A discord.js message
     * @returns {Array}
     * @memberof Fisherman
     */
  checkCommand (prefixe, message) {
        /*
        Benchmark split vs regex match : https://jsperf.com/regex-vs-split/2
        Benchmark inline RegExp vs Stored RegExp : https://jsperf.com/regexp-indexof-perf/24
        */
    var textCmd = message.content.substring(prefixe.length).match(this.commandMatchRegExp)[0]
    var cmd = this.commands.get(textCmd) || this.aliases.get(textCmd)
    cmd = this.validateCommand(message, cmd, textCmd) ? cmd : null
    if (cmd) cmd.suffixe = textCmd ? message.content.substring(prefixe.length + textCmd.length + 1) : ''
    return cmd
  }
    /**
     *
     * @private
     * @param {command} cmd
     * @param {string} suffixe
     * @param {function} validate
     * @memberof Fisherman
     */
  matchSuffixe (cmd, suffixe, validate) {
    if (cmd.regPattern) {
      validate(cmd.regPattern.test(suffixe))
    } else if (cmd.patternCallback) {
      cmd.patternCallback.test(suffixe, validate)
    } else {
      validate(true)
    }
  }
    /**
     * Validate a command, throw exceptions
     * @private
     * @param {Message} message A discord.js message
     * @param {command} cmd the command
     * @returns {boolean}
     * @memberof Fisherman
     */
  validateCommand (message, cmd, textCmd) {
    if (!cmd && this.sendNotFoundStatus) { throw new CommandNotFoundException(textCmd) } else if (!cmd) { return false }
    if (cmd.channelType.indexOf(message.channel.type) === -1) { throw new InvalidChannelException(message.channel.type) }
    let permissions = message.guild ? message.channel.permissionsFor(this.client.user) : null
    if (permissions && permissions.has(cmd.discordPermRequired)) {
      let missing = permissions.missing(cmd.discordSpecialPerms)
      if (missing.length > 0) { throw new MissingPermissionsException(missing) }
    }
    return true
  }
    /**
     * Check if there is a prefixe in content
     * @private
     * @param {string} content
     * @returns {string}
     * @memberof Fisherman
     */
  checkPrefixe (content) {
    var result = this.regPref.exec(content)
        // return (Array.isArray(result)) ? result[1] : null;
    return result ? result[1] : null
  }
    /**
     * Initialize Fisherman and the middlewares
     * @param {string} [token = null] The token to log in with, optional if the client is already connected
     * @param {function} callback An optional callback to trigger when Fisherman is initialized
     * @memberof Fisherman
     * @fires Fisherman#initialized
     */
  init (token = null, callback) {
    /**
     *  Emitted when Fisherman and middlewares are initialized
     * @event Fisherman#initialized
     */
    this.client.on('message', this.handleMessage.bind(this))
    var that = this
    if (!token) {
      this.initializeMiddleware(callback)
    } else {
      this.client.login(token).then(() => {
        that.initializeMiddleware(callback)
      })
    }
  }
    /**
     * Initialize the middlewares
     * @private
     *
     * @memberof Fisherman
     */
  initializeMiddleware (callback) {
    var that = this
    async.parallel(this.setUpListeners, function (err) {
      if (err) { throw err }
      if (typeof callback === 'function') { callback() }
      that.emit('initialized')
    })
  }

    /**
     * Create a new register to add commands
     * @fires Fisherman#registerAdded
     * @param {string} keyName The register key value, to set in the registers map
     * @param {string} [registerName = null] The register's name
     * @param {string} [registerDescription = null] The register's description
     * @return {FisherRegister} Return a FisherRegister instance
     * @memberof Fisherman
     */
  createRegister (keyName, registerName = null, registerDescription = null) {
    /**
     * Emitted when a new register is added
     * @event Fisherman#registerAdded
     */
    var register = new FisherRegister(this, registerName || keyName, registerDescription)
    this.registers.set(keyName, register)
    return register
  }
    /**
     *
     * Add a middleware to Fisherman
     * @param {(function|Object)} middleware The middleware function|class
     * @return {Fisherman}
     * @memberof Fisherman
     */
  use (middleware) {
    if (typeof middleware !== 'object' && typeof middleware !== 'function') throw new TypeError('A middleware must be a function or an object')
    this.appendMiddleware(middleware)
    return this
  }

    /**
     *
     * Add a middleware to Fisherman
     * @private
     * @param {function} middleware The middleware function|class
     * @memberof Fisherman
     */
  appendMiddleware (middleware) {
    if (typeof middleware.setUp === 'function') { this.setUpListeners.push(middleware.setUp.bind(middleware, this)) }
    if (typeof middleware.handle === 'function') {
      this.handleListeners.push(middleware.handle.bind(middleware))
      this.fallHandle = require('fastfall')(this.handleListeners)
    }
  }
}
module.exports = Fisherman

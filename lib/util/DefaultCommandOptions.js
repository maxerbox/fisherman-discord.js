/**
 * @typedef {Object} DefaultCommandOptions The command options
 * @param {string} [name=null] The command's name
 * @param {(FisherCallback|FisherPromiseCallback)} [execute=function] A FisherCallback or a fisherPromiseCallback to execute
 * @param {FisherRegister} [register=null] The command's register
 * @param {RegExp} [regPattern=null] A regexp pattner to match with the command's suffix
 * @param {PatternCallback} [patternCallback=null] A patterncallback to match with middleware
 * @param {string[]} [discordSpecialPerms="SEND_MESSAGES"] The perm(s) required to send a invalid permission fisher code
 * @param {string[]} [discordPermRequired=Array()] The perm(s) required to execute the command
 * @param {(string|string[])} [channelType=Array("dm", "group", "text")] The channel type(s) where the command can be executed, see https://discord.js.org/#/docs/main/stable/class/Channel?scrollTo=type
 * @param {Object} [locales={}] An object to store data for middlewares, or for commands
 * @param {(string|string[])} [aliases=null] An alias or an array of alias for the command
 * @param {boolean} [isPromise=false] If true, a fisherPromiseCallback is passed to the execute function instead of a FisherCallback
 */
module.exports = {
  name: null,
  execute: function (req, res) { },
  register: null,
  regPattern: null,
  patternCallback: null,
  discordSpecialPerms: ['SEND_MESSAGES'],
  discordPermRequired: [],
  channelType: ['dm', 'group', 'text'],
  locales: {},
  aliases: null,
  isPromise: false
}

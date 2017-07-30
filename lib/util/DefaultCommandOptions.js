/**
 * @typedef {Object} DefaultCommandOptions
 * @property {string} [name=null] The command's name
 * @property {(fisherCallback|fisherPromiseCallback)} [execute=function] A FisherCallback or a fisherPromiseCallback to execute
 * @property {fisherRegister} [register=null] The command's register
 * @property {RegExp} [regPattern=null] A regexp pattner to match with the command's suffix
 * @property {patternCallback} [patternCallback=null] A patterncallback to match with middleware
 * @property {string[]} [discordSpecialPerms="SEND_MESSAGES"] The perm(s) required to send a invalid permission fisher code
 * @property {string[]} [discordPermRequired=Array()] The perm(s) required to execute the command
 * @property {(string|string[])} [channelType=Array("dm", "group", "text")] The channel type(s) where the command can be executed, see https://discord.js.org/#/docs/main/stable/class/Channel?scrollTo=type
 * @property {Object} [locales={}] An object to store data for middlewares, or for commands
 * @property {(string|string[])} [aliases=null] An alias or an array of alias for the command
 * @property {boolean} [isPromise=false] If true, a fisherPromiseCallback is passed to the execute function instead of a FisherCallback
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

/**
 * @typedef {Object} FishermanOptions
 * @property {(string|string[])} [prefixes=null] A string or an array of prefixes. If it's set to null, only the mention the bot will be used
 * @property {string} [ownerID=null] The discord owner's id
 * @property {string} [commandMatchRegExp=RegStringExpression] Nothing to change here, that's the regex expression used to slipt the command and the suffixe
 * @property {boolean} [sendAliasStatus=false] If it's set to true, it will emit the code ALIAS_COMMAND: 300 when an alias is used
 * @property {boolean} [sendNotFoundStatus=false] If it's set to true, it will emit the code COMMAND_NOT_FOUND: 404 when athe command is not found
 * @property {boolean} [selfMessageProcessing=false] If enabled, the bot will proceed his own messages as command, and the middleware loop will handle them.
 * @property {Object} clientOptions The options to pass to the client, see https://discord.js.org/#/docs/main/stable/typedef/ClientOptions
 * @property {Client} [client=null] *Required. The discord.js clien. See >> https://discord.js.org/#/docs/main/stable/class/Client
 */
module.exports = {
  prefixes: null,
  ownerID: null,
  commandMatchRegExp: '^([^\\s]+)',
  sendAliasStatus: false,
  sendNotFoundStatus: false,
  selfMessageProcessing: false,
  clientOptions: {},
  client: null
}

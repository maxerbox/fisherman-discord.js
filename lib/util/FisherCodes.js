/**
 * A list of the FisherCode triggered
 * @typedef {Object} FisherCode
 * @property {number} [COMMAND_SUCESS=200] When the command sucessed (sent only with a Promise command).
 * @property {number} [ALIAS_COMMAND=300] If enabled, send a code when a alias is found.
 * @property {number} [INVALID_PATNERN=303] Sent when the patnern is not respected, allow to send an "usage" of the command.
 * @property {number} [INVALID_CHANNEL_TYPE=400] If this is not the right type of channel, it sends a 300 code.
 * @property {number} [MISSING_LOCALES_PERMISSIONS=401] Used for middleware, for missing local permissions.
 * @property {number} [MISSING_DISCORD_PERMISSIONS=403] If the command require special discord permissions, like send messages in the channel, and the bot don't have them, a 403 code is sent. >See https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
 * @property {number} [COMMAND_NOT_FOUND=404] If enabled, send a 404 code when the command is not found.
 * @property {number} [COMMAND_FAILED=500] When the command failed, with a reject() promise, or an error is thrown
 * @property {number} [MIDDLEWARE_FAILED=503] When an error is passed in the middleware callback, or an error is thrown
 */
module.exports = {
  COMMAND_SUCESS: 200,
  ALIAS_COMMAND: 300,
  INVALID_PATNERN: 303,
  INVALID_CHANNEL_TYPE: 400,
  MISSING_LOCALES_PERMISSIONS: 401,
  MISSING_DISCORD_PERMISSIONS: 403,
  COMMAND_NOT_FOUND: 404,
  COMMAND_FAILED: 500,
  MIDDLEWARE_FAILED: 503
}

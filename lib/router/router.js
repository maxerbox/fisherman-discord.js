/**
 *
 *
 * @class FisherRouter
 */
const FisherRequest = require('./request')
const FisherResponse = require('./response')
class FisherRouter {
    /**
     * Creates an instance of FisherRouter.
     * @param {Fisherman} client
     * @memberof FisherRouter
     */
  constructor (client) {
        /**
         * The fisherman client that instantied the router
         * @name FisherRouter#client
         * @type {Fisherman}
         */
    this.client = client
        /**
         * The FisherRequest
         * @name FisherRouter#request
         * @type {FisherRequest}
         */
    this.request = new FisherRequest(client)
        /**
         * The FisherResponse
         * @name FisherRouter#response
         * @type {FisherResponse}
         */
    this.response = new FisherResponse(client, this)
  }
    /**
     * Build a router from a discord.js message
     *
     * @static
     * @param {Fisherman} client The fisherman instance
     * @param {Message} message Discord.js message
     * @return {FisherRouter}
     * @memberof FisherRouter
     */
  static buildFromMessage (client, message) {
    var router = new this(client)
    router.request.message = message
    router.request.channel = message.channel
    return router
  }
}
module.exports = FisherRouter

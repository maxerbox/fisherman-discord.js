/**
 *
 *
 * @class FisherResponse
 */
class FisherResponse {
    /**
     * Creates an instance of FisherResponse.
     * @param {Fisherman} client
     * @param {FisherRouter} router
     * @memberof FisherResponse
     */
  constructor (client, router) {
        /**
         * @private
         * @type {FisherRouter}
         */
    this.router = router
        /**
         * @private
         * @type {Fisherman}
         */
    this.client = client
  }
    /**
     *
     * Emit a "fisherCode" event
     * @param {(number|FisherCode)} code The code to send
     * @param {Error} [err = null] An error to pass
     * @fires Fisherman#fisherCode
     * @memberof FisherResponse
     */
  sendCode (code, err = null) {
    /**
     * Emitted when a fisherCode is by the router, or when something bad happenned
     * @event Fisherman#fisherCode
     * @param {FisherCode}
     * @param {FisherRegister}
     */
    this.client.emit('fisherCode', this.router, code, err)
  }

    /**
     *
     * Same as channel.send()
     * @see https://discord.js.org/#/docs/main/stable/class/TextChannel?scrollTo=send
     * @param {string} text
     * @param {Object} [data = {}]
     * @returns {Promise<Message|Message[]>}
     * @memberof FisherResponse
     */
  send (text, data = {}) {
    return this.router.request.channel.send(text, data)
  }
}
module.exports = FisherResponse

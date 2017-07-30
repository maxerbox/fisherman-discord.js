/**
 * Used to create a middleware, for documentation
 * @abstract
 * @class AbstractMiddleware
 */
class AbstractMiddleware {
  constructor () {
    if (new.target === AbstractMiddleware) throw new TypeError('Cannot construct Abstract instances directly')
  }
    /**
     * Called when the the init function of fisherman is used
     * @param {Fisherman} client The fisherman instance
     * @param {function} next An async callback;
     * @memberof AbstractMiddleware
     */
  setUp (client, next) {
  }
    /**
     *  Called when a message is handled by fisherman
     * @param {FisherRequest} request A FisherRequest
     * @param {FisherResponse} response A FisherResponse
     * @param {function} next A waterfall callback, used to pass parameters. Example: next(err=null, res, req); To stop the middleware chain, use callback(true);
     * @memberof AbstractMiddleware
     */
  handle (request, response, next) {

  }
}
module.exports = AbstractMiddleware

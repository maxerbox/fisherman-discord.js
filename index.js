module.exports = {
    // classes
  Fisherman: require('./lib/fisherman'),
  FisherRegister: require('./lib/register'),
  FisherRouter: require('./lib/router/router'),
    // structure
  Middleware: require('./lib/structure/AbstractMiddleware'),
  FisherCodes: require('./lib/util/FisherCodes'),
  Command: require('./lib/structure/Command'),
  PatternCallback: require('./lib/structure/PatternCallback')
}

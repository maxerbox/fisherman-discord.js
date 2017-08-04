const middlware = require('../lib/structure/AbstractMiddleware')
class coreCommands extends middlware {
  setUp (client, next) {
    this.client = client
    var register = client.createRegister('core', 'core')
    register.textCommand('help', null, function (req, res) {
      var message = 'This command was instantied inside a middleware\n'
      client.registers.forEach(function (register) {
        message += '__' + register.name + '__:\n'
        register.forEach(function (command) {
          message += '`' + command.name + '` '
        })
        message += '\n'
      })
      res.send(message)
    })
    register.textCommand('block', null, function (req, res) {
            // this will be blocked
    })
    register.textCommand('exception', null, function (req, res) {
            // this will be blocked
    })
    next()
  }
  handle (req, res, next) {
    console.log('handle')
    if (req.isCommand && req.command.name === 'block') {
      res.send('Blocking the middleware chain')
      next(true)
    }
    if (req.isCommand && req.command.name === 'exception') {
      res.send('Creating an exception')
      next(new Error('Exception'))
    }
    req.test = true
    next(null, req, res)
  }
}
module.exports = coreCommands

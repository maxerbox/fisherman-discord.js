# Middleware tutorial

## What is a middleware, how it works, how to use it

A middleware is used to add more features to fisherman.

* Fisherman is using fastfall to build the middleware chain. It means that each middleware is executed one after the other (same as `waterfall`). The chain order is determinated by the order which you append middlewares to fisherman with `use()`

* You can break the middleware chain with `next(true)`

* If you want to throw an error and then send a fishercode, use `next(err)`

## Creating a middleware

An example is available [here](https://github.com/maxerbox/required-prefixe-fisherman)

Example: This middleware (we can call this also a "plugin") append 3 commands to fisherman

```javascript
const fisherman = require("fisherman-discord.js")
const AbstractMiddleware = fisherman.Middleware;
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
      res.send('Blocking the middleware chain without throwing a fisher code')
      next(true)
    }
    if (req.isCommand && req.command.name === 'exception') {
      res.send('Creating an exception, so trigerring a fishercode')
      next(new Error('Exception'))
    }
    req.test = true
    next(null, req, res)
  }
}
module.exports = coreCommands
```

### Only setUp function

Can be useful if you want to manage only the client, and not handle the messages (it's faster)

```javascript
const fisherman = require("fisherman-discord.js")
const AbstractMiddleware = fisherman.Middleware;
class coreCommands extends middlware {
    constructor() {
        super()
        this.handle = undefined // set handle function as "undefined", so it will be not added to the handling stack
    }
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
    next()
  }
module.exports = coreCommands
```

## Appending the middleware

```javascript
bot.use(middleware) //var bot: the fisherman client
```

## Submitting a middleware to the list

To submit a middleware, go on the fisherman discord server

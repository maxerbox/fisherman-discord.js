# Quick tutorial

## Installing fisherman

First, install fisherman through npm:

```terminal
npm install --save fisherman-discord.js
```

Then, you just have to require fisherman :

```javascript
const fisherman = require("fisherman-discord.js")
```

## Setting up the fisherman client and authentificating it

You have to first create a **new fisherman instance** and set up the [options](options)

```javascript
var bot = new fisherman.Fisherman({prefixes: ["cat!"], ownerID: "7986546546547987", clientOptions: {messageCacheMaxSize: 2}}) //options are passed here, here the bot will
//proceed all the messages starting the "cat". Also, the discord.js client will not cache more than 2 messages.

//Then we can init the client & the middlewares with the bot token
bot.on("initialized", function() { // A list of events is available here https://maxerbox.github.io/fisherman-discord.js/?api=fisherman#Fisherman
    console.log("Fisherman initialized")
})
bot.init("bot_token")
```

## Setting up the fisherman client with an already authenficated discord.js instance

```javascript
var bot = fisherman.Fisherman.createFromClient(discodJSClient, {prefixes: ["cat!"], ownerID: "7986546546547987"})
bot.init()
```

## Creating a register

To create a register named "Register test", with the key value "registerTest" (this key is used in the register library, Ex: fisherman.registers.get("registerTest"))

```javascript
var register = bot.createRegister('registerTest', 'Register test');
```

## Adding commands to fisherman

To add commands to fisherman, you need to pass through a register:

### Adding a simple textCommand

A text command is a command that can be only trigerred in a guild, and only if the bot has the permission to write messages

```javascript
register.textCommand('ping', {}, function (req, res) { //it will send ping, and then edit the message
  var current = Date.now()
  res.send('Pinging......').then((message) => {
    message.edit((Date.now() - current) + 'ms')
  })
})
```

### Adding a pm/guild command

```javascript
register.promiseCommand(['text', 'dm'], 'promise', {}, function (req, res) { //this comand can be trigerred in a guild or in pm to the bot
  res.send('Hey mate')
})
```

### Adding a promise command

A promise command is same as a normal command, but it has to be resolved/rejected
When the command is resolved, it triggers a **COMMAND\_SUCESS** [FisherCode](https://maxerbox.github.io/fisherman-discord.js/?api=fisherman#FisherCode) or a **COMMAND_FAILED** if it's rejected

```javascript
register.promiseCommand(['text'], 'promise', null, function (req, res, resolve, reject) { //this command can be trigerred in a guild, 
  res.send('Resolving the promise command')
  resolve()
})
```

### Adding a command with an object/class

```javascript
const Command = fisherMan.Command;
class SimpleCommand extends Command {
    constructor() {
        super("SimpleCommand", register)
    }
    execute(req, res) {
        res.send('Yeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
    }
}
register.addCommand(new SimpleCommand());

var command = {
    name: "object",
    execute: (req, res) {
        res.send('Yeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
    }
}
register.addCommand(command);
```

## Command options

The command options are available [here]()

### Aliases

What is an aliase ? Aliase are used to trigger a same command but with a different name

Example:

```javascript
register.textCommand('1aliase', {aliases : "abc"}, function (req, res) {
  res.send('Aliase found')
})
register.textCommand('2aliase', {aliases : ["abc", "def"]}, function (req, res) {
  res.send('Aliase found')
})
```

### Regular expressions

Regular expressions are used to match with a command suffixe

Example: matching a command with everything

```javascript
register.textCommand('match', {regPattern : new RegExp(".*")}, function (req, res) {
  res.send('command trigerred')
})
```

Example: matching a command with a discord id

```javascript
register.textCommand('match', {regPattern : new RegExp("(<@[0-9]+>|<@![0-9]+>)")}, function (req, res) {
  res.send('command trigerred: ' + this.regPattern.exec(this.suffixe)[0])
})
```

### Pattern Callback

What is the "Pattern Callback" ? It's used as custom matching

Example: Simple regular expression matching

```javascript
//Creation of a class, extending pattern callback
const PatternCallback = fisherman.PatternCallback;
class CustomMatching extends PatternCallback {
    constructor() {
        this.regPattern = new RegExp("(<@[0-9]+>|<@![0-9]+>)");
    }
    test(suffixe, validate) {
        validate(this.regPattern.test(suffixe))
    }
    exec(suffixe, validate) {
        validate(this.regPattern.exec(suffixe))
    }
}
register.textCommand('match', {patternCallback: new CustomMatching()}, function (req, res) {
  res.send('command trigerred: ' + this.regPattern.exec(this.suffixe, function(result) {})
})
//with an object
var objectMatching = {
    test : (suffixe, validate) {
        validate(true)
    },
    exec: function(suffixe, validate) {
        validate(null);
    }
}
register.textCommand('matchCats', {patternCallback: objectMatching}, function (req, res) {
  res.send('command trigerred: ' + this.regPattern.exec(this.suffixe), function(){})
})
```

Pattern Callback is useful for custom matching with middlewares/plugins

## Locales

The "locales" option is used by middlewares, to save data for them, see [required-prefixe-fisherman](https://github.com/maxerbox/required-prefixe-fisherman) for an example

## Fisherman options

The fisherman options are available [here]()

## Add middleware

```javascript
bot.use(middleware)
```

## Handling FisherCodes

A list of Fisher codes is available [here](https://maxerbox.github.io/fisherman-discord.js/?api=fisherman#FisherCode)

A switch statement can be useful on the variable code

```javascript
bot.on('fisherCode', function (router, code, err) {
  router.response.send('fisherCode ' + code + '\nError message: ' + err.message)
})
```
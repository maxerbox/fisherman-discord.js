<h1 align="center"><br><br><img width="500" src="https://cdn.rawgit.com/maxerbox/fisherman-discord.js/dfc8afbe/logo.png" alt="fisherman"><br><br><br></h1>
<div align="center">
<a href="https://scrutinizer-ci.com/g/maxerbox/fisherman-discord.js/"><img src="https://img.shields.io/scrutinizer/g/maxerbox/fisherman-discord.js.svg"></a>
<a href="https://www.npmjs.com/package/fisherman-discord.js"><img src="https://img.shields.io/npm/dt/fisherman-discord.js.svg"></a>
<a href="https://www.npmjs.com/package/fisherman-discord.js"><img src="https://img.shields.io/npm/v/fisherman-discord.js.svg"></a>
<img src="https://img.shields.io/github/license/maxerbox/fisherman-discord.js.svg">
<img src="https://img.shields.io/david/maxerbox/fisherman-discord.js.svg">
<a href="https://travis-ci.org/maxerbox/fisherman-discord.js"><img src ="https://travis-ci.org/maxerbox/fisherman-discord.js.svg?branch=master"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="javascript style guide"></a>
</div>

# Fisherman - Discord.js

```terminal
npm install --save fisherman-discord.js
```

> Copyright © 2017, Simon Sassi

## What is Fisherman

<h3 align="center"><img width="100" src="https://avatars3.githubusercontent.com/u/29208316?v=4&s=400" alt="standard-js"><br><br></h3>

 > *a lightweight, fast, and powerful discord command router* written in javascript standard style and inspired by expressjs

__Fisherman features__ :

* Use native RegExp to match with the prefixe(s)

* Powerful middleware/plugin chain using [fastfall](https://www.npmjs.com/package/fastfall)

* Entirely written in javascript language style

* FisherCodes (status handling) event, same as http codes handling

* Bunch of middlewares [available](https://maxerbox.github.io/fisherman-discord.js/?content=middleware_list)

* Documentation with a tutorial

* Inspired by expressjs and klein, express command creation style with request/response statements (see example below), to be simple

* Promised commands, custom pattern matching with patternCallback option etc...

```javascript
var bot = new fisherMan.Fisherman({ prefixes: ['fish!'] }) // creating a client, with the prefixe "fish!"
bot.use(middleware) // appending a middleware/plugin to fisherman
var register = bot.createRegister('test', 'test') //creating a register named "test"
console.log('registerCreated')
register.textCommand('test', null, function (req, res) { // registering a new command, named "test"
//This command will be trigerred by "fish!test". It is only available in a text channel.
  res.send(`Command infos:\nName: ${req.command.name}\nRegister name: \`${req.command.register.name}\`\nTotal command count in the fisherman client: ${req.client.commands.size}`, { embed: { description: 'This request was made through the fishman project' } })
})
register.textCommand('ping', null, function (req, res) { //registering a new command named "ping"
  var current = Date.now()
  res.send('Pinging......').then((message) => {
    message.edit((Date.now() - current) + 'ms')
  })
})
bot.init('_token_') //logging in with the token
bot.on('fisherCode', function (router, code, err) { //displaying the fishercodes trigerred
  router.response.send('fisherCode ' + code + '\nError message: ' + err.message)
})
```

## Documentation

[Discord server](https://discord.gg/pXH252u)

[Quick tutorial](https://maxerbox.github.io/fisherman-discord.js/?content=tutorial)

[Documentation link](https://maxerbox.github.io/fisherman-discord.js/)

[Api docs](https://maxerbox.github.io/fisherman-discord.js/?api=fisherman)

## Middleware list

The middleware list is available [here](https://maxerbox.github.io/fisherman-discord.js/?content=middleware_list)
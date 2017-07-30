# Fisherman - Discord.js

## What is Fisherman

Fisherman is *a lightweight, fast, and powerful discord command router* writed in javascript language style

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

[Quick tutorial](https://maxerbox.github.io/fisherman-discord.js/?content=tutorial)

[Documentation link](https://maxerbox.github.io/fisherman-discord.js/)

[Api docs](https://maxerbox.github.io/fisherman-discord.js/?api=fisherman)

## Middleware list

The middleware list is available [here](https://maxerbox.github.io/fisherman-discord.js/?content=middleware_list)
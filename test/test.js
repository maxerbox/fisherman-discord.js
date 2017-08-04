const fisherMan = require('../')
const Test = require('./middlewareTest')
var token
var tts = 10000
try {
  token = require('./auth.json').token
  tts = require('./auth.json').tts
} catch (e) {
  token = process.env.TOKEN
  tts = process.env.TTS || 10000
}
console.log(token)
var middleware = new Test()
var bot = new fisherMan.Fisherman({ prefixes: ['fish!'] })
bot.use(middleware)
var register = bot.createRegister('test', 'test')
console.log('registerCreated')
register.textCommand('test', null, function (req, res) {
  res.send(`Command infos:\nName: ${req.command.name}\nRegister name: \`${req.command.register.name}\`\nTotal command count in the fisherman client: ${req.client.commands.size}\nPassed through the middleware proof: ${req.test}`, { embed: { description: 'This request was made through the fishman project' } })
})
register.textCommand('ping', null, function (req, res) {
  var current = Date.now()
  res.send('Pinging......').then((message) => {
    message.edit((Date.now() - current) + 'ms')
  })
})
register.promiseCommand(['text'], 'promise', null, function (req, res, resolve, reject) {
  res.send('Resolving the promise command')
  resolve({message: "I'm resolved yeeeeeeeeeeeeeee"})
})
register.promiseCommand(['text'], 'promisereject', null, function (req, res, resolve, reject) {
  res.send('Rejecting the promise command')
  reject(new Error("I'm rejected"))
})
bot.init(token)
bot.on('fisherCode', function (router, code, err) {
  router.response.send('fisherCode ' + code + '\nError message: ' + err.message)
})
const Command = fisherMan.Command
class SimpleCommand extends Command {
  constructor () {
    super('SimpleCommand', register)
    this.aliases = ['catting']
  }
  execute (req, res) {
    res.send('Yeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
  }
}
register.addCommand(new SimpleCommand())
register.textCommand('match', {regPattern: new RegExp('(<@[0-9]+>|<@![0-9]+>)')}, function (req, res) {
  res.send('command trigerred: ' + this.regPattern.exec(this.suffixe)[0])
})
console.log(register.size)

setTimeout(function () {
  process.exit(0)
}, tts)

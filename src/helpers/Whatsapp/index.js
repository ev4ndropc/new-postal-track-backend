const { WAConnection } = require('@adiwajshing/baileys')
const redisClient = require('../Redis')


const path = require('path')
const fs = require('fs')
redisClient.set("qr_code", '')

const client = new WAConnection()
client.autoReconnect = true

var authInfo = null

try {
  authInfo = path.join(__dirname, "auth_info.json")
  client.loadAuthInfo(authInfo)
} catch{ }

function WAconnect() {

  client.connect()
  .then (user => {
      const creds = client.base64EncodedAuthInfo ()
      fs.writeFileSync(path.join(__dirname, '/auth_info.json'), JSON.stringify(creds, null, '\t'))
  })

  client.on('qr', qr => {
    redisClient.set("qr_code", JSON.stringify(qr))
  })
}

client.on('connection-validated', () => {
  redisClient.set("qr_code", 'connected')

})

client.on('open', () => {
  fs.unlink(path.join(__dirname, "qr_code.json"), () => {})
})

client.on('close', () => {
  fs.unlink(path.join(__dirname, "auth_info.json"), () => {})
})

module.exports = { client, WAconnect }

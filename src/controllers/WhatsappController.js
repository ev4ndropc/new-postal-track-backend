const fs = require('fs');
const path = require('path')
const { MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys')

const { client, WAconnect } = require('../helpers/Whatsapp')
const redisClient = require('../helpers/Redis')

module.exports = {
  async sendMessage(request, response) {
    const { message, number } = request.query

    if(!message || !number)
    return response.status(200).json({ ok: false, message: 'Error! Send number and message in query.' })

    let whats_number = `${number}@s.whatsapp.net`

    const exists = await client.isOnWhatsApp(number)
    if (exists) {
      await client.sendMessage(whats_number, message, MessageType.text)
      .then(() => response.status(200).json({ ok: true, message: `Message sent to +${number}` }))
    }else{
      return response.status(400).json({ ok:false, message: 'The number entered does not have a Whatsapp account.' })

    }

  },

  async Disconnect(request, response) {
    const state = client.state

    if(state == 'close')
    return response.status(400).json({ ok: true, message: "There is currently no active session." })

    if(state == 'open'){
      client.logout()
      client.clearAuthInfo()
      client.close()
      return response.status(200).json({ ok: true, message: 'Session ended successfully!' })
    }

    if(state == 'connecting')
    return response.status(400).json({ ok: false, message: 'You are not in an active session!' })

  },

  async Connect(request, response) {

    if(client.state == 'close'){
      WAconnect()
      return response.status(200).json({ ok: true, message: 'Scan the qr code.' })
    }
    if(client.state == 'connecting'){
      return response.status(400).json({ ok: false, message: 'Please ready QRCODE.' })
    }
    if(client.state == 'open'){
      return response.status(400).json({ ok: false, message: "You are already in an active session." })
    }

  },

  async getQrCode(request, response) {
    redisClient.get('qr_code', function(err, qr_code) {

      if(qr_code == ''){
        return response.status(400).json({ ok: true, message: 'Please connect first.' })
      }
      if(qr_code == 'connected'){
        return response.status(400).json({ ok: false, message: 'You are already in an active session.' })
      }else{
        return response.status(200).json({ ok: true, message: qr_code })
      }

    });
  }
}

const database = require('../../database')
const queue = require("../Queue")

const EmailBody = require('../Email/Template')

queue.consume("sent_active_email", async message => {
    const user_token = message.content.toString()

    const mailjet = require ('node-mailjet')
    .connect('63f1c28886ccbac70fd48d94f44a14ec', 'e46bd20654c4348f10133c6b0dc74ed2')
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": "admin@rocketpainel.com",
            "Name": "Evandro"
          },
          "To": [
            {
              "Email": "e_sayto@hotmail.com",
              "Name": "Evandro"
            }
          ],
          "Subject": "Bem vindo(a) a PostalTrack.",
          "TextPart": "Bem vindo(a) a PostalTrack",
          "HTMLPart": EmailBody('active_account', {active_key: 'user_token'}),
          "CustomID": "AppGettingStartedTest"
        }
      ]
    })
    request.then((result) => {
      console.log(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
    })
}) 
const express = require('express')
const routes = express.Router()

const Auth = require('../middlewares/Auth')
const AuthController = require('../controllers/AuthController')

const Correios = require('../controllers/CorreiosController')
const Whatsapp = require('../controllers/WhatsappController')
const Code = require('../controllers/CodeController')

//Auth Routes
routes.post('/auth/signin', AuthController.signin)
routes.post('/auth/signup', AuthController.signup)


//Correios Routes
routes.get('/tracking/code', Correios.getOne)
routes.get('/tracking/codes', Correios.getMany)

//Whatsapp Routes
routes.get('/whatsapp/send/text-message/', Whatsapp.sendMessage)
routes.get('/whatsapp/disconnect/', Whatsapp.Disconnect)
routes.get('/whatsapp/connect/', Whatsapp.Connect)
routes.get('/whatsapp/get_qrcode/', Whatsapp.getQrCode)

routes.post('/insert_code', Code.insetCode)

module.exports = routes

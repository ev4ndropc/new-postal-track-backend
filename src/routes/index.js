const express = require('express')
const routes = express.Router()

const Auth = require('../middlewares/Auth')
const AuthController = require('../controllers/AuthController')

const Correios = require('../controllers/CorreiosController')
const Whatsapp = require('../controllers/WhatsappController')
const Package = require('../controllers/PackageController')
const Queue = require('../controllers/QueueController')

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

//Package Routes
routes.post('/add/package', Auth, Package.addPackage)
routes.get('/search/package', Auth, Package.searchPackage)
routes.get('/list/package', Auth, Package.listPackage)
routes.get('/get/package', Auth, Package.getPackage)
routes.put('/edit/package', Auth, Package.editPackage)
routes.delete('/delete/package', Auth, Package.deletePackage)
routes.delete('/delete/package/all', Auth, Package.deleteAllPackage)
routes.delete('/delete/package/all_delivered', Auth, Package.deleteAllDeliveredPackage)

// Queue routes
routes.get('/queue/get', Queue.autoTrackCode)

module.exports = routes

const { v4: uuidv4, v4 } = require('uuid')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const database = require('../database')
const authConfig = require('../config/auth.json')

const { sendToQueue } = require('../helpers/Queue')
require('../helpers/Worker/EmailWorker')


function generateToken(params = {} ) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  })
}

module.exports = {
  async signup(request, response) {
    const {
      name,
      email,
      password,
      phone_number,
    } = request.body

    if(!name || !email || !password)
    return response.status(400).json({ ok: false, message: 'Please send all required data!' })

    const user = await database.select('email').where({ email }).table('users')

    if(user[0])
    return response.status(302).json({ ok: false, message: 'There is already a registered user with this email!' })

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const avatar = `default-avatar${Math.floor(Math.random() * (4 - 1)) + 1}.png`

    const user_token = v4()

    database.insert({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email,
      password: hash,
      phone_number,
      avatar,
      is_admin: 2,
      balance: 0,
      user_token
    })
    .into('users')
    .then(result => {
      sendToQueue('sent_active_email', user_token)
      return response.status(200).json({ ok: true, message: 'Account created successfully!', token: generateToken({ id: result.id, email: email, token: user_token }) })
    })
    .catch(err => {
      console.log(err)
      return response.status(400).json({ ok: false, message: 'An error has occurred, contact the support!' })
    })
  },

  async signin(request, response) {
    const { email, password } = request.body

    if(!email || !password)
    return response.status(404).json({ ok: false, message: 'Please send email and password!' })

    const user = await database.select().where({ email }).table('users').first()

    if(!user)
    return response.status(401).json({ ok: false, message: 'Email or password is incorrect!' })

    if(!bcrypt.compareSync(password, user.password))
    return response.status(401).json({ ok: false, message: 'Email or password is incorrect!' })

    return response.status(200).json({ ok: true, token: generateToken({ id: user.id, email: user.email, token: user.user_token }) })
  },

}

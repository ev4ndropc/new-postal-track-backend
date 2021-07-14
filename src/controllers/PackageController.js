const moment = require('moment')
moment.locale('pt-br')
const database = require('../database')

module.exports = {
    async addPackage(request, response) {
        const { client_name, client_number, code } = request.body

        if(!client_name || !client_number || !code)
        return response.status(400).json({ ok: false, message: 'Please send all necessary fields.' })

        if(client_name.trim() == '' || client_number.trim() == '' || code.trim() == '')
        return response.status(400).json({ ok: false, message: 'Please send all necessary fields.' })

        const hasCode = await database.select('').where({ code }).table('codes').first()

        if(hasCode)
        return response.status(400).json({ ok: false, message: 'This code is already registered.' })

        try {
            await database.insert({ code, client_name, client_number, user_email: request.userEmail, status: 'Nenhum dado ainda', created_at: moment().format() }).into('codes')
            return response.status(200).json({ ok: true, message: 'Package added successfully.' })
        } catch (error) {
            return response.status(400).json({ ok: false, message: 'An error has occurred, please try again later!' })
        }
    }
}
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
            await database.insert({ 
                client_name, 
                client_number, 
                code,
                sent_welcome: 'n',
                allowed: 'y',
                user_token: request.userToken, 
                status: 'Nenhum dado ainda', 
                created_at: moment().format() 

            }).into('codes')
            return response.status(200).json({ ok: true, message: 'Package added successfully.' })
        } catch (error) {
            return response.status(400).json({ ok: false, message: 'An error has occurred, please contact our support!' })
        }
    },

    async listPackage(request, response) {
        const { page } = request.query

        let currentPage = Number(page)

        if(!page){
            currentPage = 1
        }

        try {
            const data = await database.select().table('codes').where({ user_token: request.userToken }).paginate({ perPage: 10, currentPage })
            return response.status(200).json({ ok: true, data })
        } catch (error) {
            return response.status(400).json({ ok: false, message: 'An error has occurred, please try again later!' })
        }
    },

    async deletePackage(request, response) {
        const { id } = request.query

        try {
            await database.delete().where({ id, user_token: request.userToken }).table('codes')
            return response.status(200).json({ ok: true, messsage: 'Code deleted successfully!' })
        } catch (error) {
            return response.status(400).json({ ok: true, messsage: 'An error has occurred, please contact our support.' })
        }
    }
}
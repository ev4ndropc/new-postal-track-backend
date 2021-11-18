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
                finished: 'n', 
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
    
    async getPackageInfo(request, response) {
        try {
            const data = await database.select().where({ user_token: request.userToken }).table('codes')
            var track_package = data.length
            var limit_package = 50
            var on_my_way_package = 0
            var delivered_package = 0
            
            data.forEach(package => {
                if(package.finished == 'n'){
                    on_my_way_package++
                }else{
                    delivered_package++
                }
            })
            
            var info = {
                track_package,
                limit_package,
                on_my_way_package,
                delivered_package
            }
            
            return response.status(200).json({ ok: true, info })
            
        } catch (error) {
            console.log(error)
            return response.status(400).json({ ok: false, message: 'An error has occurred, please try again later!' })
            
        }
    },
    
    async getPackage(request, response) {
        const { code } = request.query
        
        try {
            const data = await database.select().table('codes').where({
                code,
                user_token: request.userToken
            }).first()
    
            return response.status(200).json({ ok: true, data })
        } catch (error) {
            return response.status(400).json({ ok: false, messsage: 'An error has occurred, please contact our support.' })
        }
    },

    async editPackage(request, response) {
        const { client_name, client_number, code, last_update_hour, last_update_date, status, finished } = request.body
        
        if(!client_name || !client_number || !code || !last_update_hour || !last_update_date || !status || !finished)
        return response.status(401).json({ ok: false, message: 'Please send all necessary fields.' })

        try {
            await database.update({
                client_name,
                client_number,
                code,
                last_update_hour,
                last_update_date, 
                status,
                finished
            }).where({ code, user_token: request.userToken }).table('codes')

            return response.status(200).json({ ok: true, message: 'Code updated successfully!' })
        } catch (error) {
            console.log(error)
            return response.status(400).json({ ok: false, messsage: 'An error has occurred, please contact our support.' })
        }
    },

    async searchPackage(request, response) {
        const { type, searchFor } = request.query

        if(type == undefined || searchFor == undefined)
        return response.status(401).json({ ok: false, message: 'Please send all necessary fields.' })

        if(type.trim() == '' || searchFor.trim() == '')
        return response.status(401).json({ ok: false, message: 'Please send all necessary fields.' })

        switch (type) {
            case 'client_name':
                var data = await database.select().where('client_name', 'like', `%${searchFor}%` ).table('codes').where({ user_token: request.userToken })
                response.status(200).json({ ok: true, data })
              break;
            case 'client_number':
                var data = await database.select().where('client_number', 'like', `%${searchFor}%` ).table('codes').where({ user_token: request.userToken })
                response.status(200).json({ ok: true, data })
              break;
            case 'code':
                var data = await database.select().where('code', 'like', `%${searchFor}%` ).table('codes').where({ user_token: request.userToken })
                response.status(200).json({ ok: true, data })
              break;

            case 'last_update_hour':
                var data = await database.select().where('last_update_hour', 'like', `%${searchFor}%` ).table('codes').where({ user_token: request.userToken })
                response.status(200).json({ ok: true, data })
              break;

            case 'last_update_date':
                var data = await database.select().where('last_update_date', 'like', `%${searchFor}%` ).table('codes').where({ user_token: request.userToken })
                response.status(200).json({ ok: true, data })
              break;

            case 'status':
                var data = await database.select().where('status', 'like', `%${searchFor}%` ).table('codes').where({ user_token: request.userToken })
                response.status(200).json({ ok: true, data })
              break;
            default:
              null
          }
          

        return
    },

    async deletePackage(request, response) {
        const { id } = request.query

        try {
            await database.delete().where({ id, user_token: request.userToken }).table('codes')
            return response.status(200).json({ ok: true, messsage: 'Code deleted successfully!' })
        } catch (error) {
            return response.status(400).json({ ok: false, messsage: 'An error has occurred, please contact our support.' })
        }
    },

    async deleteAllDeliveredPackage(request, response) {
        try {
            await database.delete().where({ user_token: request.userToken, finished: 'y' }).table('codes')
            return response.status(200).json({ ok: true, messsage: 'All code deleted successfully!' })
        } catch (error) {
            return response.status(400).json({ ok: false, messsage: 'An error has occurred, please contact our support.' })
        }
    },

    async deleteAllPackage(request, response) {
        try {
            await database.delete().where({ user_token: request.userToken }).table('codes')
            return response.status(200).json({ ok: true, messsage: 'All code deleted successfully!' })
        } catch (error) {
            return response.status(400).json({ ok: false, messsage: 'An error has occurred, please contact our support.' })
        }
    }

}
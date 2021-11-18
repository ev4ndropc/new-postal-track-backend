const bcrypt = require('bcrypt')
const database = require('../database')

module.exports = {
    async getUserInfo(request, response) {

        try {
            const user_info = await database.select().where({ email: request.userEmail }).table('users').first()

            var data = {
                name: user_info.name,
                email: user_info.email,
                avatar: user_info.avatar, 
                whatsapp: user_info.phone_number, 
                balance: user_info.balance,
                storeName: user_info.store_name
            }

            return response.status(200).json({ ok: true, data })
        } catch (error) {
            return response.status(400).json({ ok: false, message: 'Any error occurred, contact the support.' })           
        }
    },

    async updateStoreName(request, response) {
        const { store_name } = request.query

        if(store_name.trim() == '') return response.status(400).json({ ok: false, message: 'Please, sent store name!' })
        
        try {
            await database.update({ store_name }).where({ email: request.userEmail }).table('users')
            return response.status(200).json({ ok: true, message: 'The name has been set successfully!' })
        } catch (error) {
            return response.status(400).json({ ok: false, message: 'Any error occurred, contact the .' })           
        }
    },

    async updateUserInfo(request, response) {
        const { name, email, password, avatar, whatsapp, storeName } = request.body

        let data = undefined

        if(password.trim() != '') {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            data = {
                name,
                email,
                password: hash,
                avatar,
                phone_number: whatsapp,
                store_name: storeName
            }
        }else{
            data = {
                name,
                email,
                avatar,
                phone_number: whatsapp,
                store_name: storeName
            }
        }

        try {
            await database.update(data).where({ email: request.userEmail }).table('users')
            return response.status(200).json({ ok: true, message: 'Data updated successfully!'})
        } catch (error) {
            return response.status(400).json({ ok: false, message: 'Any error occurred, contact the support.'})
        }
    },
    
    async getSalesChannel(request, response) {
        try {
            var sales_channel = await database.select().where({ user_email: request.userEmail }).table('sales_channel')
            return response.status(200).json({ ok: true, sales_channel })
        } catch (error) {
            return response.status(400).json({ ok: false, message: 'Any error occurred, contact the support.' })
            
        }
    },

    async addSalesChannel(request, response) {
        const { sale_channel_name } = request.query
        try {
            var sales_channel = await database.select().where({ name: sale_channel_name, user_email: request.userEmail }).table('sales_channel')
            
            if(sales_channel != '')
            return response.status(400).json({ ok: false, message: 'There is already a sales channel with this name registered' })
            
            await database.insert({ name: sale_channel_name, user_email: request.userEmail }).into('sales_channel')
            return response.status(200).json({ ok: true, message: 'Sales channel successfully added.' })

        } catch (error) {
            return response.status(400).json({ ok: false, message: 'Any error occurred, contact the support.' })
            
        }
    },
}
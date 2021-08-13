const { request } = require('express')
const database = require('../database')

module.exports = {
    async getSalesChannel(request, response) {
        try {
            var sales_channel = await database.select().where({ user_email: request.userEmail }).table('sales_channel')
            return response.status(200).json({ ok: true, sales_channel })
        } catch (error) {
            return response.status(400).json({ ok: false, message: 'Any error occurred, contact the administrator.' })
            
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
            return response.status(400).json({ ok: false, message: 'Any error occurred, contact the administrator.' })
            
        }
    },
}
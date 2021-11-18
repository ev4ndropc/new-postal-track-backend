const moment = require('moment')
moment.locale('pt')

const database = require('../database')

module.exports = {
    async listCollects(request, response) {
        const { page, search_date } = request.query

        let currentPage = Number(page)
    
        if(!page){
            currentPage = 1
        }

        if(search_date){
            if(search_date.trim() != '') {
                try {
                    const data = await database.select().table('collects').where({ date: search_date, email: request.userEmail }).orderBy('created_at', 'desc').paginate({ perPage: 10, currentPage })
                    return response.status(200).json({ ok: true, data })
                } catch (error) {
                    return response.status(400).json({ ok: false, message: 'An error has occurred, please try again later!' })
                }
            }

        }else{
    
            try {
                const data = await database.select().table('collects').where({ email: request.userEmail }).orderBy('created_at', 'desc').paginate({ perPage: 10, currentPage })
                return response.status(200).json({ ok: true, data })
            } catch (error) {
                return response.status(400).json({ ok: false, message: 'An error has occurred, please try again later!' })
            }
        }

    },

    async addCollects(request, response) {
        const { identifier, sale_channel } = request.query

        if(!identifier || !sale_channel)
        return response.status(404).json({ ok: false, message: 'Please send all require data!' })

        try {
            const have = await database.select().where({
                identifier,
                email: request.userEmail
            }).table('collects')

            if(have != '')
            return response.status(400).json({ ok: false, message: 'There is already a collection registered with this identifier'})


            await database.insert({
                identifier: identifier,
                sale_channel: sale_channel,
                collected: 'false',
                email: request.userEmail,
                date: moment(moment().unix()*1000).format('YYYY-MM-DD'),
                time: moment(moment().unix()*1000).format('LT'),
                created_at: moment().unix()*1000,
                updated_at: moment().unix()*1000
            }).into('collects')
    
            return response.status(200).json({ ok: true, message: 'Collection added successfully!'})
        } catch (error) {
            return response.status(400).json({ ok: false, message: 'An error has occurred, contact the support.'})
        }
    },

    async findCollect(request, response) {
        const { identifier } = request.query

        const data = await database.select().where('identifier', 'like', `%${identifier}%` ).table('collects').where({ email: request.userEmail })
        response.status(200).json({ ok: true, data })
    },

    async deleteOne(request, response) {
        const { identifier } = request.query

        if(!identifier)
        return response.status(404).json({ ok: false, message: 'Please send all require data!' })

        try {
            await database.delete().where({ identifier, email: request.userEmail }).table('collects')
            return response.status(200).json({ ok: true, message: 'Collection successfully deleted!' })
        } catch (error) {
            return response.status(400).json({ ok: false, message: 'An error has occurred, contact the support.'})
        }

    },
    async deleteCollect(request, response) {
        const { identifier } = request.query

        if(!identifier)
        return response.status(404).json({ ok: false, message: 'Please send all require data!' })

        try {
            await database('collects').where({ identifier, email: request.userEmail }).del()
            return response.status(200).json({ ok: true, message: 'All collection successfully deleted!' })

        } catch (error) {
            return response.status(400).json({ ok: false, message: 'An error has occurred, contact the support.'})
            
        }
    },

    async markAsCollected(request, response) {
        const { identifier } = request.body

        if(!identifier)
        return response.status(404).json({ ok: false, message: 'Please send all require data!' })

        try {
            await database('collects').update({ collected: 'true' }).whereIn('identifier', identifier).where({ email: request.userEmail })
            return response.status(200).json({ ok: true, message: 'All collection successfully deleted!' })

        } catch (error) {
            return response.status(400).json({ ok: false, message: 'An error has occurred, contact the support.'})
            
        }
    },

    async markAsNotCollected(request, response) {
        const { identifier } = request.body

        if(!identifier)
        return response.status(404).json({ ok: false, message: 'Please send all require data!' })

        try {
            await database('collects').update({ collected: 'false' }).whereIn('identifier', identifier).where({ email: request.userEmail })
            return response.status(200).json({ ok: true, message: 'All collection successfully deleted!' })

        } catch (error) {
            return response.status(400).json({ ok: false, message: 'An error has occurred, contact the support.'})
            
        }
    }
}
const database = require('../database')

require('../helpers/Worker')

const { sendToQueue } = require('../helpers/Queue')

module.exports = {
    async autoTrackCode(request, response) {
        var codes = await database.select('code', 'last_update_date', 'last_update_hour').where({ finished: 'n' }).table('codes')
        
        if(codes.length > 0) {
            sendToQueue('auto_tracker', codes)
        }
        return response.status(200).json({ ok: true })
    }
}
const database = require('../database')

module.exports = {
    async insetCode (request, response) {
        const { data } = request.body

        database.insert({
            code: data.code,
            client_name: data.name,
            client_number: data.phone_number,
            sale_price: data.order_total_value,
            created_at: data.buy_date,
            order_id: data.order_id

        })
        .into('codes')
        .then(data => {
            return response.status(200).json({ ok: true })
        })
        .catch(err => {
            console.log(err)
        })


    }
}
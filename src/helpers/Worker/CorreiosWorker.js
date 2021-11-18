const database = require('../../database')
const queue = require("../Queue")

const Correios = require('../Correios')

queue.consume("auto_tracker", async message => {
    //process the message

    try {
        
        var data = JSON.parse(message.content.toString())
    
        var result = await Correios.fetchManyCodes(data)
    
    
        if(result.length == undefined){
            if(result.erro){
                return null
            }else{
                var info = ({
                    code: result.numero,
                    event: result.evento
                })
    
                if(info.event[0]){
                    var date = info.event[0].data
                    var hour = info.event[0].hora
                    var status = info.event[0].descricao
    
                    data.filter(async codes => {
                        if(codes.code == info.code){
                            if(codes.last_update_date != date || codes.last_update_hour != hour){
    
                                try {
    
                                    if(status == 'Objeto entregue ao destinatário'){
                                        await database.update({
                                            last_update_date: date,
                                            last_update_hour: hour,
                                            status,
                                            finished: 'y'
                                        }).where({
                                            code: codes.code
                                        }).table('codes')
                                        return
                                    }else{
                                        await database.update({
                                            last_update_date: date,
                                            last_update_hour: hour,
                                            status
                                        }).where({
                                            code: codes.code
                                        }).table('codes')
                                        return
                                    }
    
                                } catch (error) {
                                    return console.log(error)
                                }
    
                            }
                        }
                    })
                }
            }
        }else{
    
            result.forEach(code => {
                if(code.erro){
                    return null
                }else{
                    var info = ({
                        code: code.numero,
                        event: code.evento
                    })
    
                    if(info.event[0]){
                        var date = info.event[0].data
                        var hour = info.event[0].hora
                        var status = info.event[0].descricao
    
                        data.filter(async codes => {
                            if(codes.code == info.code){
                                if(codes.last_update_date != date || codes.last_update_hour != hour){
    
                                    try {
                                        if(status == 'Objeto entregue ao destinatário'){
    
                                            await database.update({
                                                last_update_date: date,
                                                last_update_hour: hour,
                                                status,
                                                finished: 'y'
                                            }).where({
                                                code: codes.code
                                            }).table('codes')
                                            return
    
                                        }else{
                                            await database.update({
                                                last_update_date: date,
                                                last_update_hour: hour,
                                                status,
                                            }).where({
                                                code: codes.code
                                            }).table('codes')
                                        }
                                    } catch (error) {
                                        console.log(error)
                                    }
    
                                }
                            }
                        })
                    }
                }
            })
    
        }
    } catch (error) {
        return null
    }



    
})
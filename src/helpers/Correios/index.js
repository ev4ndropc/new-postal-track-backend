require('dotenv').config()
const fetch = require('node-fetch')
var parseString = require('xml2js').parseString;

const fetchOneCode = async (code) => {
  return await fetch("http://webservice.correios.com.br:80/service/rastro", {
    "method": "POST",
    "headers": {
      "cookie": "_op_aixPageId=a2_84ed662a-634d-4c01-bcb3-8932451cfce5"
    },
    "body": `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:res="http://resource.webservice.correios.com.br/">
      <soapenv:Header/>
      <soapenv:Body>
        <res:buscaEventos>
        <usuario>${process.env.CORREIOS_USERNAME}</usuario>
        <senha>${process.env.CORREIOS_PASSWORD}</senha>
        <tipo>L</tipo>
        <resultado>T</resultado>
        <lingua>101</lingua>
        <objetos>${code}</objetos>
        </res:buscaEventos>
      </soapenv:Body>
    </soapenv:Envelope>
    `
  })
  .then(response => {
    return response.text()
  })
  .then(dataXML => {
    parseString(dataXML, function (err, result) {
      xml = result['soapenv:Envelope']['soapenv:Body'][0]['ns2:buscaEventosResponse'][0].return[0].objeto[0]
    })
    xml.numero = xml.numero[0]
    xml.sigla = xml.sigla[0]
    xml.nome = xml.nome[0]
    xml.categoria = xml.categoria[0]


    xml.evento.forEach(obj => {

      if(obj.detalhe) {
        obj.detalhe = obj.detalhe[0]
      }

      obj.tipo = obj.tipo[0]
      obj.uf = obj.uf[0]
      obj.status = obj.status[0]
      obj.data = obj.data[0]
      obj.hora = obj.hora[0]
      obj.descricao = obj.descricao[0]
      obj.local = obj.local[0]
      obj.codigo = obj.codigo[0]
      obj.cidade = obj.cidade[0]
      obj.uf = obj.uf

      if(obj.destino){
        obj.destino.forEach(obj_des => {
          obj_des.local = obj_des.local[0]
          obj_des.codigo = obj_des.codigo[0]
          obj_des.cidade = obj_des.cidade[0]
          obj_des.local = obj_des.local[0]
          obj_des.bairro = obj_des.bairro[0]
          obj_des.uf = obj_des.uf[0]
        })
      }

      if(obj.endereco){
        obj.endereco.forEach(obj_end => {
          obj_end.codigo = obj_end.codigo[0]
          obj_end.cep = obj_end.cep[0]
          obj_end.logradouro = obj_end.logradouro[0]
          obj_end.numero = obj_end.numero[0]
          obj_end.localidade = obj_end.localidade[0]
          obj_end.uf = obj_end.uf[0]
          obj_end.bairro = obj_end.bairro[0]

        })
      }
    })

    xml.evento = xml.evento

    return xml
  })
}

const fetchManyCodes = async (codes) => {
  var codes_array = []
  codes.forEach(code => {
    codes_array.push(`<objetos>${code}</objetos>`)
  });

  return await fetch("http://webservice.correios.com.br:80/service/rastro", {
    "method": "POST",
    "headers": {
      "cookie": "_op_aixPageId=a2_84ed662a-634d-4c01-bcb3-8932451cfce5"
    },
    "body": `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:res="http://resource.webservice.correios.com.br/">
      <soapenv:Header/>
      <soapenv:Body>
        <res:buscaEventosLista>
        <usuario>${process.env.CORREIOS_USERNAME}</usuario>
        <senha>${process.env.CORREIOS_PASSWORD}</senha>
        <tipo>L</tipo>
        <resultado>T</resultado>
        <lingua>101</lingua>
        ${codes_array.join('\n')}
        </res:buscaEventosLista>
      </soapenv:Body>
    </soapenv:Envelope>
    `
  })
  .then(response => {
    return response.text()
  })
  .then(dataXML => {
    parseString(dataXML, function (err, result) {
      xml = result['soapenv:Envelope']['soapenv:Body'][0]['ns2:buscaEventosListaResponse'][0].return[0].objeto
    })

    xml.forEach(obj => {
      obj.numero = obj.numero[0]
      obj.sigla = obj.sigla[0]
      obj.nome = obj.nome[0]
      obj.categoria = obj.categoria[0]

      if(obj.evento) {
        obj.evento.forEach(event => {
          if(event.detalhe) {
            event.detalhe = event.detalhe[0]
          }

          event.tipo = event.tipo[0]
          event.uf = event.uf[0]
          event.status = event.status[0]
          event.data = event.data[0]
          event.hora = event.hora[0]
          event.descricao = event.descricao[0]
          event.local = event.local[0]
          event.codigo = event.codigo[0]
          event.cidade = event.cidade[0]
          event.uf = event.uf

          if(event.destino){
            event.destino.forEach(obj_des => {
              obj_des.local = obj_des.local[0]
              obj_des.codigo = obj_des.codigo[0]
              obj_des.cidade = obj_des.cidade[0]
              obj_des.local = obj_des.local[0]
              obj_des.bairro = obj_des.bairro[0]
              obj_des.uf = obj_des.uf[0]
            })
          }
        })
      }
    })

    xml.evento = xml.evento.reverse()

    return xml
  })
}

module.exports = { fetchOneCode, fetchManyCodes }

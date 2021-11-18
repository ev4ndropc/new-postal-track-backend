require('dotenv').config()
const fetch = require('node-fetch')
var parser = require('fast-xml-parser');

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
    var json = parser.parse(dataXML)
    return json['soapenv:Envelope']['soapenv:Body']['ns2:buscaEventosResponse'].return.objeto
  })
  .catch(err => null)
}


const fetchManyCodes = async (codes) => {
  var codes_array = []
  codes.forEach(code => {
    codes_array.push(`<objetos>${code.code}</objetos>`)
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
    var json = parser.parse(dataXML)
    return json['soapenv:Envelope']['soapenv:Body']['ns2:buscaEventosListaResponse'].return.objeto
  })
  .catch(err => null)
}

module.exports = { fetchOneCode, fetchManyCodes }

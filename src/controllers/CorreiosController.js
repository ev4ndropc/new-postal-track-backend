const { fetchManyCodes, fetchOneCode } = require('../helpers/Correios')

module.exports = {
  async getOne(request, response) {
    const { code } = request.query

    if(!code)
    return response.status(200).json({ ok: false, message: 'Send a code on the body!' })

    const result = await fetchOneCode(code)
    if(!result)
    return response.status(200).json({ ok: false, message: 'Code not found!' })

    return response.status(200).json({ ok: true, result })
  },

  async getMany(request, response) {
    const { codes } = request.query

    if(!codes)
    return response.status(200).json({ ok: false, message: 'Send a code on the body!' })

    let parse_codes = codes.split(',')

    const result = await fetchManyCodes(parse_codes)
    if(!result)
    return response.status(200).json({ ok: false, message: 'Code not found!' })

    return response.status(200).json({ ok: true, result })
  }
}

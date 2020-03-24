
const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
  list: async (request, response) => {
    const ongs = await connection('ongs').select('*')
  
    return response.status(200).json({
      status: 200,
      response: 'OK',
      ongs
    })
  },

  create: async (request, response) => {
    const { name, email, whatsapp, city, uf } = request.body
    const id = crypto.randomBytes(4).toString('HEX')
  
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })
  
    return response.status(201).json({
      status: 201,
      response: 'created',
      id
    })
  }
}
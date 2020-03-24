const connection = require('../database/connection')

module.exports = {
  create: async (request, response) => {
    const { id } = request.body

    const ong = await connection('ongs').select('name').where('id', id).first()
    if(!ong){
      throw { status: 404, response: 'not_found', message: `ONG id: ${id} not found in database.` }
    }

    return response.status(200).json({
      status: 200,
      response: 'OK',
      ong
    })
  }
}
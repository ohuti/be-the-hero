const connection = require('../database/connection')

module.exports = {
  list: async (request, response) => {
    const ong_id = request.headers.authorization

    const incidents = await connection('incidents').select('*').where('ong_id', ong_id)

    return response.status(200).json({
      status: 200,
      response: 'OK',
      incidents
    })
  }
}
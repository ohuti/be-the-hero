const connection = require('../database/connection')

module.exports = {
  list: async (request, response) => {
    const { page = 1 } = request.query

    const count = await connection('incidents').count().first()

    const incidents = await connection('incidents')
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ])
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)

    response.header('X-Total-Count', count['count(*)'])

    return response.status(200).json({
      status: 200,
      response: 'OK',
      incidents
    })
  },

  create: async (request, response) => {
    const ong_id = request.headers.authorization
    const { title, description, value } = request.body

    const [ id ] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    })

    return response.status(201).json({
      status: 201,
      response: 'created',
      id
    })
  },

  delete: async (request, response) => {
    const ong_id = request.headers.authorization
    const { id } = request.params

    const incident = await connection('incidents')
      .select('ong_id')
      .where('id', id)
      .first()

    if(incident.ong_id !== ong_id) {
      throw { status: 401, response: 'unauthorized' }
    }

    await connection('incidents').delete().where('id', id)

    return response.status(204).send()
  }
}
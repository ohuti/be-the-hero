const express = require('express')
const controllerHandler = require('../utils/controller-handler')
const OngController = require('../controllers/ong')
const IncidentController = require('../controllers/incident')
const ProfileController = require('../controllers/profile')
const SessionController = require('../controllers/session')
const { notFoundHandler, exceptionHandler } = require('./exception-handlers')

const routes = express.Router()

routes.get('/', (request, response) => response.status(200).json({ status: 'ok' }) )

routes.get('/ong', controllerHandler(OngController.list))
routes.post('/ong', controllerHandler(OngController.create))

routes.get('/incident', controllerHandler(IncidentController.list))

routes.post('/session', controllerHandler(SessionController.create))

routes.post('/incident', controllerHandler(IncidentController.create))
routes.delete('/incident/:id', controllerHandler(IncidentController.delete))

routes.get('/ong/incident', controllerHandler(ProfileController.list))

routes.use(notFoundHandler)
routes.use(exceptionHandler)

module.exports = routes
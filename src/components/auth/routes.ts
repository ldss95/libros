import express from 'express'
const routes = express.Router()

import controller from './controller'

routes.post('/login', controller.login)
routes.post('/logout', controller.logout)
routes.post('/signup', controller.signup)
routes.get('/session', controller.getSession)

export default routes
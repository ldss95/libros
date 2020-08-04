import { Router } from 'express'
const routes: Router = Router()

import controller from './controller'

routes.route('/')
    .get(controller.getAll)
    .post(controller.create)

routes.get('/authors', controller.getAuthors)
routes.post('/like', controller.like)
routes.post('/dislike', controller.dislike)

export default routes
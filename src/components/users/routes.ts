import { Router } from 'express'
const routes: Router = Router()

import controller from './controller'

routes.route('/')
    .get(controller.getAll)

routes.get('/:id', controller.getOne)

export default routes
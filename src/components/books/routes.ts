import { Router } from 'express'
const routes: Router = Router()

import controller from './controller'

routes.route('/')
	.get(controller.getAll)
	.post(controller.create)

export default routes
import { Router } from 'express'
const routes: Router = Router()

import controller from './controller'

routes.route('/')
	.post(controller.vote)

export default routes
import { Request, Response } from 'express'

import { User } from './model'

export default {
	getOne: (req: Request, res: Response) => {
		const { id } = req.params
		User.findOne({
			where: { id }
		}).then(user => res.status(200).send(user))
		.catch(error => {
			res.sendStatus(500)
			throw error
		})
	},
	getAll: (req: Request, res: Response) => {
		User.findAll()
			.then(users => res.status(200).send(users))
			.catch(error => {
				res.sendStatus(500)
				throw error
			})
	}
}
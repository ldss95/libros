import { Request, Response } from 'express'
import { fn, col } from 'sequelize'

import { Book } from './model'
import { Author } from '../authors/model'
import { Vote } from '../votes/model'

export default {
	create: (req: Request, res: Response) => {
		Book.create({
			...req.body,
			user: req.session!.user_id
		}).then(() => res.sendStatus(200))
		.catch(error => {
			res.sendStatus(500)
			throw error
		})
	},
	getAll: (req: Request, res: Response) => {
		const query =
			`SELECT
				b.id,
				b.title,
				b.description,
				b.date,
				b.publication_year,
				b.author,
				b.user,
				a.name AS authorName,
				COALESCE(v.calification, 0) AS calification
			FROM
				books b
			LEFT JOIN
				authors a ON a.id = b.author
			LEFT JOIN
				voting v ON v.book = b.id AND v.user = ${req.session!.user_id}`

		Book.sequelize?.query(query)
			.then(books => {
				res.status(200).send(books[0])
			})
			.catch(error => {
				res.sendStatus(500)
				throw error
			})
	}
}
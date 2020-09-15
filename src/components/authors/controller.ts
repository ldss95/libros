import { Request, Response } from 'express'

import { Author } from './model'

export default {
	getAll: (req: Request, res: Response) => {
        Author.findAll()
            .then(authors => res.status(200).send(authors))
            .catch(error => {
                res.sendStatus(500)
				throw error
            })
	}
}
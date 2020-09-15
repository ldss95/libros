import { Request, Response } from 'express'

import { Vote } from './model'

export default {
	vote: async (req: Request, res: Response) => {
		try {
			const { book, calification } = req.body
			const { user_id } = req.session!
			
			const where = {
				user: user_id,
				book
			}

			const updatedVote = await Vote.update({ calification }, { where })
			if(updatedVote[0]){
				res.sendStatus(200)
				return
			}

			await Vote.create({ user: user_id, book, calification })
			res.sendStatus(200)
		} catch (error) {
			res.sendStatus(500)
			throw error 
		}
	}
}
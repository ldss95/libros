import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

import { User } from '../users/model'

export default {
	login: (req: Request, res: Response) => {
		const { email, password } = req.body

		User.findOne({ where: { email } })
			.then(user => {
				if (!user){
					res.status(200).send({ message: 'Email invalido' })
					return
				}

				if(!bcrypt.compareSync(password, user.password)){
					res.status(200).send({ message: 'Contraseña incorrecta' })
					return  
				}

				req.session!.loggedin = true
				req.session!.user_id = user.id
				req.session!.nombre = user.name
				req.session!.email = user.email
				req.session!.save((error: any) => {
					if(error){
						res.sendStatus(500)
						throw error
					}
	
					res.status(200).send({ session_started: true })
				})
			}).catch(error => {
				res.sendStatus(500)
				throw error
			})
	},
	logout: (req: Request, res: Response) => {
		req.session!.destroy((error: any) => {
			if(error){
				res.sendStatus(500)
				throw error
			}

			res.sendStatus(200)
		})
	},
	signup: (req: Request, res: Response) => {
		const { name, email, password } = req.body
        
        User.create({
            name,
            email,
            password: bcrypt.hashSync(password, 13)
        }).then(() => res.status(200).send({ created: true }))
        .catch(error => {
			res.sendStatus(500)
			throw error
		})
	},
	getSession: (req: Request, res: Response) => {
		res.json(
			(req.session!.loggedin) ?
			JSON.stringify({
				id: req.session!.id,
				nombre: req.session!.nombre,
				email: req.session!.email
			}) : {}
		)
	},
	isLoggedIn: (req: Request, res: Response, next: NextFunction) => {
		if (req.session!.loggedin)
			next()
		else
			res.redirect('/login')
	}
}
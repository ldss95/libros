import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

import db from '../../lib/db'

export default {
    login: (req: Request, res: Response) => {
        const email = req.body.email
        const password = req.body.password

        db.all(`SELECT * FROM users WHERE email = '${email}'`, (error: any, rows: any) => {
            if (error){
                res.sendStatus(500)
                throw error
            }

            if (rows.length == 0){
                res.status(200).send({ message: 'Email invalido' })
                return
            }

            const user = rows[0]
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
        const name = req.body.name
        const email = req.body.email
        const password = bcrypt.hashSync(req.body.password, 13)
        const query = `INSERT INTO users (name, email, password) VALUES('${name}', '${email}', '${password}')`
        db.run(query, (error: any, results: any) => {
            if (error){
                res.sendStatus(500)
                throw error
            }

            res.status(200).send({ created: true })
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
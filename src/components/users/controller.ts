import { Request, Response } from 'express'

import db from '../../lib/db'
import { _User } from './model'

export default {
    getOne: (req: Request, res: Response) => {
        const id = req.params.id
        const query = `SELECT * FROM users WHERE id = ${id}`
        db.each(query, (error: any, rows: _User[]) => {
            if (error){
                res.sendStatus(500)
                throw error
            }

            res.status(200).send(rows[0])
        })
    },
    getAll: (req: Request, res: Response) => {
        const sql = `SELECT * FROM users`
        db.all(sql, (error: any, rows: _User[]) => {
            if (error){
                res.sendStatus(500)
                throw error
            }

            res.status(200).send(rows)
        })
    }
}
import { Request, Response } from 'express'
import moment from 'moment'

import db from '../../lib/db'
import { _Book } from './model'

export default {
    create: (req: Request, res: Response) => {
        try {
            const book = req.body
            const query =
                `INSERT INTO
                    books (title, description, date, publication_year, author, user)
                VALUES
                    (?, ?, ?, ?, ?, ?)`
            const prepare = db.prepare(query)
            prepare.run(
                book.title,
                book.description,
                moment().format('YYYY-MM-DD HH:mm:ss'),
                book.publication_year,
                book.author,
                req.session!.user_id
            )

            prepare.finalize()

            res.sendStatus(200)
        } catch (error) {
            res.sendStatus(500)
            throw error
        }
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

        db.all(query, (error: any, rows: _Book[]) => {
            if (error){
                res.sendStatus(500)
                throw error
            }

            res.status(200).send(rows)
        })
    },
    getAuthors: (req: Request, res: Response) => {
        db.all('SELECT * FROM authors', (error: any, rows: any) => {
            if(error){
                res.sendStatus(500)
                throw error
            }

            res.status(200).send(rows)
        })
    },
    like: (req: Request, res: Response) => {
        const book = req.body.book
        const user = req.session!.user_id
        const query = `SELECT * FROM voting WHERE user = ${user} AND book = ${book}`
        db.all(query, (error: any, results: any) => {
            if(error){
                res.sendStatus(500)
                throw error
            }

            const query = (results.length > 0)
                ? `UPDATE voting SET calification = 1 WHERE book = ${book} AND user = ${user}`
                : `INSERT INTO voting VALUES (${user}, ${book}, 1, '${moment().format('YYYY-MM-DD HH:mm:ss')}')`
                
            db.run(query, (error: any, results: any) => {
                if(error){
                    res.sendStatus(500)
                    throw error
                }

                res.sendStatus(200)
            })
        })

    },
    dislike: (req: Request, res: Response) => {
        const book = req.body.book
        const user = req.session!.user_id
        const query = `SELECT * FROM voting WHERE user = ${user} AND book = ${book}`
        db.all(query, (error: any, results: any) => {
            if(error){
                res.sendStatus(500)
                throw error
            }

            const query = (results.length > 0)
                ? `UPDATE voting SET calification = -1 WHERE book = ${book} AND user = ${user}`
                : `INSERT INTO voting VALUES (${user}, ${book}, -1, '${moment().format('YYYY-MM-DD HH:mm:ss')}')`
                
            db.run(query, (error: any, results: any) => {
                if(error){
                    res.sendStatus(500)
                    throw error
                }

                res.sendStatus(200)
            })
        })
    }
}
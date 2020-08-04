import { Router, Request, Response, NextFunction } from 'express'
const routes: Router = Router()

import users from './components/users/routes'
import books from './components/books/routes'
import authRoutes from './components/auth/routes'
import authController from './components/auth/controller'

routes.get('/', authController.isLoggedIn, (req: Request, res: Response) => {
    res.render('home')
})

routes.get('/login', (req: Request, res: Response) => {
    res.render('login')
})

routes.get('/signup', (req: Request, res: Response) => {
    res.render('signup')
})

routes.get('/home', authController.isLoggedIn, (req: Request, res: Response) => {
    res.render('home')
})

routes.get('/create', authController.isLoggedIn, (req: Request, res: Response) => {
    res.render('create')
})

routes.use('/users', users)
routes.use('/books', books)
routes.use('/auth', authRoutes)

export default routes
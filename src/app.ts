import express, { Express } from 'express'
import exphbs from 'express-handlebars'
import expsession from 'express-session'
const SQLiteStore = require('connect-sqlite3')(expsession)
import path from 'path'

import routes from './routes'

const app: Express = express()

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}))
app.set('view engine', '.hbs')

/**/

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expsession({
    secret: 'thisissecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    },
    store: new SQLiteStore
}))

app.use(express.static(path.join(__dirname, 'public')))
app.use(routes)

export default app;
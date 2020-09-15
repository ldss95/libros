import path from 'path'

import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
	dialect: 'sqlite',
	dialectOptions: {
		dateStrings: true,
		typeCast: true
	},
	storage: path.join(__dirname, 'db.db'),
	logging: false
})

//sequelize.sync({ alter: true, force: true })

export { sequelize }
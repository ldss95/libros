import { DataTypes } from 'sequelize'

import { sequelize } from '../../lib/db'
import { AuthorAttr } from './interface'
import { Book } from '../books/model'

const Author = sequelize.define<AuthorAttr>('Author', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		unique: true
	},
	name: {
		type: DataTypes.TEXT,
		allowNull: false
	}
}, { timestamps: false })

export { Author }
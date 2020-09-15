import { DataTypes } from 'sequelize'

import { sequelize } from '../../lib/db'
import { BookAttr } from './interface'
import { Vote } from '../votes/model'
import { Author } from '../authors/model'

const Book = sequelize.define<BookAttr>('Book', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		unique: true
	},
	title: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	date: {
		type: DataTypes.DATEONLY,
		allowNull: false,
		defaultValue: DataTypes.NOW
	},
	publication_year: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	author: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	user: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, { timestamps: false })

Book.belongsTo(Author, { foreignKey: 'author' })
Book.hasMany(Vote, { foreignKey: 'book' })

export { Book }
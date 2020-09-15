import { DataTypes } from 'sequelize'

import { sequelize } from '../../lib/db'
import { UserAttr } from './interface'

const User = sequelize.define<UserAttr>('User', {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		unique: true
	},
	name: {
		type: DataTypes.STRING
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, { timestamps: false })

export { User }
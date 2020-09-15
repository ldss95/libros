import { DataTypes } from 'sequelize'

import { sequelize } from '../../lib/db'
import { VoteAttr } from './interface'
import { User } from '../users/model'
import { Book } from '../books/model'

const Vote = sequelize.define<VoteAttr>('Vote', {
	user: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	book: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	calification: {
		type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isIn: [['-1', '1']]
        }
	},
	date: {
		type: DataTypes.DATEONLY,
		allowNull: false,
		defaultValue: DataTypes.NOW
	}
}, { timestamps: false,  tableName: 'voting' })

Vote.removeAttribute('id')

Vote.belongsTo(User, { foreignKey: 'user' })

export { Vote }
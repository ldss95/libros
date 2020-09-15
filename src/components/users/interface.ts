import { Model } from 'sequelize'

export interface UserAttr extends Model {
	id?: number;
	name: string;
	email: string;
	password: string;
}
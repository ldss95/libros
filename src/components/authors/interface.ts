import { Model } from 'sequelize'

export interface AuthorAttr extends Model {
	id?: number;
	name: string;
}
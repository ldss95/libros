import { Model } from 'sequelize'

export interface BookAttr extends Model {
	id?: number;
	title: string;
	description: string;
	date: string;
	publication_year: number;
	author: number;
	user: number;
}
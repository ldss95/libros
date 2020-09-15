import { Model } from 'sequelize'

export interface VoteAttr extends Model {
	user: number;
	book: number;
	calification: number;
	date?: string;
}
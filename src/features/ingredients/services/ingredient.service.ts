import chefifyAPI from '@/lib/api';
import type { CommonResponse, QueryParams } from '@/types/common.types';
import type { Ingredient, IngredientDTO } from '@/types/ingredient.type';

export const IngredientService = {
	async create(data: IngredientDTO): Promise<void> {
		await chefifyAPI.post('/ingredient', data);
	},

	async getIngredient(
		params: QueryParams,
	): Promise<CommonResponse<Ingredient[]>> {
		const ingredients = await chefifyAPI.get('/ingredient', { params });
		return ingredients.data;
	},

	async getIngredientById(id: string): Promise<CommonResponse<Ingredient>> {
		const ingredient = await chefifyAPI.get(`/ingredient/${id}`);
		return ingredient.data;
	},

	async update(data: Partial<IngredientDTO>): Promise<void> {
		await chefifyAPI.put(`/ingredient/${data._id}`, data);
	},
	async delete(id: string): Promise<void> {
		await chefifyAPI.delete(`/ingredient/${id}`);
	},
};

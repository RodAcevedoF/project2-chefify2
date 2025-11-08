import chefifyAPI from '@/lib/api';
import type { QueryParams } from '@/types/common.types';
import type { Ingredient, IngredientDTO } from '@/types/ingredient.type';

export const IngredientService = {
	async create(data: IngredientDTO): Promise<void> {
		return chefifyAPI.post<void>('/ingredient', data);
	},

	async getIngredient(params: QueryParams): Promise<Ingredient[]> {
		return chefifyAPI.get<Ingredient[]>('/ingredient', { params });
	},

	async getIngredientById(id: string): Promise<Ingredient> {
		return chefifyAPI.get<Ingredient>(`/ingredient/${id}`);
	},

	async update(data: Partial<IngredientDTO>): Promise<void> {
		return chefifyAPI.put<void>(`/ingredient/${data._id}`, data);
	},
	async delete(id: string): Promise<void> {
		return chefifyAPI.delete<void>(`/ingredient/${id}`);
	},
};

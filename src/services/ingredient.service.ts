import chefifyAPI from '@/lib/api';
import type { QueryParams } from '@/types/common.types';
import type { IngredientDTO } from '@/types/ingredient.type';

export const IngredientService = {
	async create(data: IngredientDTO): Promise<void> {
		await chefifyAPI.post('/ingredient', {
			data,
		});
	},

	async get(params: QueryParams) {
		if (params.id) {
			const ingredient = await chefifyAPI.get(`/ingredient/${params.id}`);
			return ingredient.data;
		}

		const recipes = await chefifyAPI.get('/ingredient', { params });
		return recipes.data;
	},
};

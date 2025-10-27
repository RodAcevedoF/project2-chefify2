import chefifyAPI from '@/lib/api';
import normalizeSuggestedRecipeResponse from '@/features/recipes/utils/normalizeSuggestedResponse';
import type { Recipe, RecipeDTO, UpdateRecipeDTO } from '@/types/recipe.types';
import type { QueryParams, CommonResponse } from '@/types/common.types';

const BASE = '/recipe';

export const RecipeService = {
	async getRecipes(params: QueryParams): Promise<CommonResponse<Recipe[]>> {
		const recipes = await chefifyAPI.get(`${BASE}`, { params });
		return recipes.data;
	},

	async getRecipeById(id: string): Promise<CommonResponse<Recipe>> {
		const recipe = await chefifyAPI.get(`${BASE}/${id}`);
		return recipe.data;
	},

	async createRecipe(data: RecipeDTO): Promise<void> {
		await chefifyAPI.post(`${BASE}`, data);
	},

	async updatedRecipe(data: UpdateRecipeDTO): Promise<void> {
		await chefifyAPI.patch(`${BASE}/${data._id}`, data);
	},

	async getSuggestedRecipe(): Promise<RecipeDTO> {
		const resp = await chefifyAPI.get(`${BASE}/suggested`);
		const normalized = normalizeSuggestedRecipeResponse(resp);
		return normalized as unknown as RecipeDTO;
	},

	async deleteRecipe(id: string): Promise<void> {
		await chefifyAPI.delete(`${BASE}/${id}`);
	},
};

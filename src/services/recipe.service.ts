import chefifyAPI from '@/lib/api';
import type { Recipe, RecipeDTO, UpdateRecipeDTO } from '@/types/recipe.types';
import type { QueryParams, CommonResponse } from '@/types/common.types';

export const RecipeService = {
	async getRecipes(params: QueryParams): Promise<CommonResponse<Recipe[]>> {
		const recipes = await chefifyAPI.get('/recipe', { params });
		return recipes.data;
	},

	async getRecipeById(id: string): Promise<CommonResponse<Recipe>> {
		const recipe = await chefifyAPI.get(`/recipe/${id}`);
		return recipe.data;
	},

	async createRecipe(data: RecipeDTO): Promise<Recipe> {
		const recipe = await chefifyAPI.post('/recipe', data);
		return recipe.data;
	},

	async updatedRecipe(data: UpdateRecipeDTO): Promise<void> {
		await chefifyAPI.patch(`/recipe/${data._id}`, data);
	},

	async getSuggestedRecipe(): Promise<RecipeDTO> {
		const suggestedRecipe: RecipeDTO = await chefifyAPI.get(
			'/recipe/suggested',
		);
		return suggestedRecipe;
	},

	async deleteRecipe(id: string): Promise<void> {
		await chefifyAPI.delete(`/recipe/${id}`);
	},
};

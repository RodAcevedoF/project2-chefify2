import chefifyAPI from '@/lib/api';
import type { CommonResponse } from '@/types/common.types';
import type { Recipe } from '@/types/recipe.types';
import type { User, UserDTO } from '@/types/user.types';

const BASE = '/user';

export const UserService = {
	async getUsers(): Promise<CommonResponse<User>> {
		const user = await chefifyAPI.get(`${BASE}`);
		return user.data;
	},
	async getUserByEmail(email: string): Promise<CommonResponse<User>> {
		const user = await chefifyAPI.get(`/${BASE}/${email}`);
		return user.data;
	},

	async updateUser(user: UserDTO): Promise<void> {
		await chefifyAPI.patch(`${BASE}`, user);
	},

	async deleteUser(): Promise<void> {
		await chefifyAPI.delete(`${BASE}`);
	},

	async getOwnRecipes(): Promise<CommonResponse<Recipe[]>> {
		const recipes = await chefifyAPI.get(`${BASE}/my-recipes`);
		return recipes.data;
	},

	async getRecentOperations(): Promise<CommonResponse<unknown[]>> {
		const resp = await chefifyAPI.get(`${BASE}/ops`);
		return resp.data;
	},

	async getSavedRecipes(): Promise<CommonResponse<Recipe[]>> {
		const recipes = await chefifyAPI.get(`${BASE}/saved-recipes`);
		return recipes.data;
	},

	async deleteSavedRecipe(recipeId: string): Promise<void> {
		await chefifyAPI.delete(`${BASE}/remove-recipe/${recipeId}`);
	},

	async saveRecipe(recipeId: string): Promise<void> {
		await chefifyAPI.post(`${BASE}/save-recipe/${recipeId}`);
	},
};

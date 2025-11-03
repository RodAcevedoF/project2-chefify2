import chefifyAPI from '@/lib/api';
import type { Recipe } from '@/types/recipe.types';
import type { User, UserDTO } from '@/types/user.types';

const BASE = '/user';

export const UserService = {
	async getUsers(): Promise<User> {
		return chefifyAPI.get<User>(`${BASE}`);
	},
	async getUserByEmail(email: string): Promise<User> {
		return chefifyAPI.get<User>(`/${BASE}/${email}`);
	},

	async updateUser(user: UserDTO | FormData): Promise<void> {
		if (user instanceof FormData) {
			return chefifyAPI.patch<void>(
				`${BASE}`,
				user as unknown as Record<string, unknown>,
			);
		}

		return chefifyAPI.patch<void>(`${BASE}`, user);
	},

	async deleteUser(): Promise<void> {
		return chefifyAPI.delete<void>(`${BASE}`);
	},

	async getOwnRecipes(): Promise<Recipe[]> {
		return chefifyAPI.get<Recipe[]>(`${BASE}/my-recipes`);
	},

	async getRecentOperations(): Promise<unknown[]> {
		return chefifyAPI.get<unknown[]>(`${BASE}/ops`);
	},

	async getSavedRecipes(): Promise<Recipe[]> {
		return chefifyAPI.get<Recipe[]>(`${BASE}/saved-recipes`);
	},

	async deleteSavedRecipe(recipeId: string): Promise<void> {
		return chefifyAPI.delete<void>(`${BASE}/remove-recipe/${recipeId}`);
	},

	async saveRecipe(recipeId: string): Promise<void> {
		return chefifyAPI.post<void>(`${BASE}/save-recipe/${recipeId}`);
	},
};

import chefifyAPI from '@/lib/api';
const BASE = '/like';

export const LikeService = {
	async like(recipeId: string): Promise<void> {
		return chefifyAPI.post<void>(`${BASE}/${recipeId}/like`);
	},

	async unlike(recipeId: string): Promise<void> {
		return chefifyAPI.delete<void>(`${BASE}/${recipeId}/unlike`);
	},

	async hasLiked(recipeId: string): Promise<boolean> {
		return chefifyAPI.get<boolean>(`${BASE}/${recipeId}/has-liked`);
	},
};

export default LikeService;

import chefifyAPI from '@/lib/api';
import type { CommonResponse } from '@/types/common.types';

const BASE = '/like';

export const LikeService = {
	async like(
		recipeId: string,
	): Promise<CommonResponse<{ likesCount: number; hasLiked: boolean }>> {
		if (process.env.NODE_ENV === 'development') {
			console.debug('[LikeService.like] called', { recipeId });
		}
		const res = await chefifyAPI.post(`${BASE}/${recipeId}/like`);
		return res.data;
	},

	async unlike(
		recipeId: string,
	): Promise<CommonResponse<{ likesCount: number; hasLiked: boolean }>> {
		if (process.env.NODE_ENV === 'development') {
			console.debug('[LikeService.unlike] called', { recipeId });
		}
		const res = await chefifyAPI.delete(`${BASE}/${recipeId}/unlike`);
		return res.data;
	},

	async hasLiked(
		recipeId: string,
	): Promise<CommonResponse<{ hasLiked: boolean }>> {
		const res = await chefifyAPI.get(`${BASE}/${recipeId}/has-liked`);
		return res.data;
	},

	async getLikesForRecipe(recipeId: string) {
		const res = await chefifyAPI.get(`${BASE}/${recipeId}`);
		return res.data;
	},
};

export default LikeService;

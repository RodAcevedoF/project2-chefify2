import chefifyAPI from '@/lib/api';
import type { CommonResponse } from '@/types/common.types';

const BASE = '/like';

export const LikeService = {
	async like(recipeId: string): Promise<void> {
		const res = await chefifyAPI.post(`${BASE}/${recipeId}/like`);
		return res.data;
	},

	async unlike(recipeId: string): Promise<void> {
		const res = await chefifyAPI.delete(`${BASE}/${recipeId}/unlike`);
		return res.data;
	},

	async hasLiked(recipeId: string): Promise<CommonResponse<boolean>> {
		const res = await chefifyAPI.get(`${BASE}/${recipeId}/has-liked`);
		return res.data;
	},
};

export default LikeService;

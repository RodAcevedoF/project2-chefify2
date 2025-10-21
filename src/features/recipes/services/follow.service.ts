import chefifyAPI from '@/lib/api';
import type { CommonResponse } from '@/types/common.types';

const BASE = '/follow';

export const FollowService = {
	async follow(
		userId: string,
	): Promise<CommonResponse<{ followersCount: number; isFollowing: boolean }>> {
		const res = await chefifyAPI.post(`${BASE}/${userId}/follow`);
		return res.data;
	},

	async unfollow(
		userId: string,
	): Promise<CommonResponse<{ followersCount: number; isFollowing: boolean }>> {
		const res = await chefifyAPI.delete(`${BASE}/${userId}/unfollow`);
		return res.data;
	},

	async getFollowers(userId: string) {
		const res = await chefifyAPI.get(`${BASE}/${userId}/followers`);
		return res.data;
	},

	async getFollowing(userId: string) {
		const res = await chefifyAPI.get(`${BASE}/${userId}/following`);
		return res.data;
	},

	async isFollowing(userId: string) {
		const res = await chefifyAPI.get(`${BASE}/${userId}/is-following`);
		return res.data;
	},
};

export default FollowService;

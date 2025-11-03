import chefifyAPI from '@/lib/api';
import type { User } from '@/types/user.types';

const BASE = '/follow';

export type ToggleFollowResponse = {
	followersCount: number;
	isFollowing: boolean;
};

export const FollowService = {
	async follow(userId: string): Promise<ToggleFollowResponse> {
		return chefifyAPI.post<ToggleFollowResponse>(`${BASE}/${userId}/follow`);
	},

	async unfollow(userId: string): Promise<ToggleFollowResponse> {
		return chefifyAPI.delete<ToggleFollowResponse>(
			`${BASE}/${userId}/unfollow`,
		);
	},

	async getFollowers(userId: string): Promise<User[]> {
		return chefifyAPI.get<User[]>(`${BASE}/${userId}/followers`);
	},

	async getFollowing(userId: string): Promise<User[]> {
		return chefifyAPI.get<User[]>(`${BASE}/${userId}/following`);
	},

	async isFollowing(userId: string): Promise<boolean> {
		const resp = await chefifyAPI.get<{ isFollowing: boolean }>(
			`${BASE}/${userId}/is-following`,
		);
		return resp.isFollowing;
	},
};

export default FollowService;

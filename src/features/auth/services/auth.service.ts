import chefifyAPI from '@/lib/api';
import noAuthApi from '@/lib/noAuthApi';
import type { LoginParams, RegisterParams } from '@/types/auth.types';

const BASE = '/auth';

export const AuthService = {
	async login({ email, password }: LoginParams) {
		const res = await chefifyAPI.post(`${BASE}/login`, {
			email,
			password,
		});
		return res;
	},

	async register({ name, email, password }: RegisterParams) {
		const res = await chefifyAPI.post(`${BASE}/register`, {
			name,
			email,
			password,
		});
		return res;
	},

	async getMe() {
		const res = await chefifyAPI.get(`${BASE}/me`);
		return res;
	},

	async logout() {
		const res = await chefifyAPI.post(`${BASE}/logout`);
		return res;
	},

	async refresh() {
		const res = await noAuthApi.post(`${BASE}/refresh`);
		return res.data;
	},
};

import chefifyAPI from '@/lib/api';
import type { LoginParams, RegisterParams } from '@/types/auth.types';

export const AuthService = {
	async login({ email, password }: LoginParams) {
		const res = await chefifyAPI.post('/auth/login', {
			email,
			password,
		});
		return res;
	},

	async register({ name, email, password }: RegisterParams) {
		const res = await chefifyAPI.post('/auth/register', {
			name,
			email,
			password,
		});
		return res;
	},

	async getMe() {
		const res = await chefifyAPI.get('/auth/me');
		return res;
	},

	async logout() {
		const res = await chefifyAPI.post('/auth/logout');
		return res;
	},

	async refresh() {
		const res = await chefifyAPI.post('/auth/refresh');
		return res.data;
	},
};

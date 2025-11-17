import chefifyAPI from '@/lib/api';
import type {
	LoginParams,
	RegisterParams,
	AuthResponse,
} from '@/types/auth.types';

const BASE = '/auth';

export const AuthService = {
	async login({ email, password }: LoginParams): Promise<AuthResponse> {
		return chefifyAPI.post<AuthResponse>(`${BASE}/login`, { email, password });
	},

	async register({
		name,
		email,
		password,
	}: RegisterParams): Promise<AuthResponse> {
		return chefifyAPI.post<AuthResponse>(`${BASE}/register`, {
			name,
			email,
			password,
		});
	},

	async getMe(): Promise<AuthResponse> {
		return chefifyAPI.get<AuthResponse>(`${BASE}/me`);
	},

	async logout(): Promise<AuthResponse> {
		return chefifyAPI.post<AuthResponse>(`${BASE}/logout`);
	},

	async changePassword(payload: {
		currentPassword?: string;
		newPassword: string;
		targetUserId?: string;
	}): Promise<void> {
		return chefifyAPI.post<void>(`${BASE}/change-password`, payload);
	},

	async forgotPassword(payload: { email: string }): Promise<void> {
		return chefifyAPI.post<void>(`${BASE}/forgot-password`, payload);
	},

	async resetPassword(payload: {
		token: string;
		newPassword: string;
	}): Promise<void> {
		return chefifyAPI.post<void>(`${BASE}/reset-password`, payload);
	},
	async verifyEmail(token: string): Promise<void> {
		return chefifyAPI.get<void>(`${BASE}/verify-email`, { params: { token } });
	},
};

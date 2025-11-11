import chefifyAPI from '@/lib/api';
import type { UserDTO, User } from '@/types/user.types';
import type { Recipe } from '@/types/recipe.types';

export type ImportRecipesResult = {
	inserted?: Recipe[];
	skipped?: { row: number; reason: string; data?: unknown }[];
};

export type ImportUsersResult = {
	inserted?: User[];
	skipped?: { row: number; reason: string; data?: unknown }[];
};

const BASE = '/admin';

export const AdminService = {
	async createUser(payload: FormData | Partial<UserDTO>): Promise<User> {
		return chefifyAPI.post<User>(
			`${BASE}/`,
			payload as unknown as Record<string, unknown>,
		);
	},

	async importRecipes(file: FormData): Promise<ImportRecipesResult> {
		return chefifyAPI.post<ImportRecipesResult>(`${BASE}/recipes`, file, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	},

	async importIngredients(file: FormData): Promise<{ imported?: number }> {
		return chefifyAPI.post<{ imported?: number }>(`${BASE}/ingredients`, file, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	},

	async importUsers(file: FormData): Promise<ImportUsersResult> {
		return chefifyAPI.post<ImportUsersResult>(`${BASE}/users/import`, file, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	},

	async getUsersTemplate(format: 'csv' | 'xlsx' = 'csv'): Promise<Blob> {
		const q = new URLSearchParams();
		q.set('format', format);
		return chefifyAPI.get<Blob>(`${BASE}/users/template?${q.toString()}`, {
			responseType: 'blob',
		});
	},

	async getRecipesTemplate(format: 'csv' | 'xlsx' = 'csv'): Promise<Blob> {
		const q = new URLSearchParams();
		q.set('format', format);
		return chefifyAPI.get<Blob>(`${BASE}/recipes/template?${q.toString()}`, {
			responseType: 'blob',
		});
	},

	async getUsers(): Promise<User[]> {
		return chefifyAPI.get<User[]>(`${BASE}/users`);
	},

	async getUsersPaginated(params?: {
		page?: number;
		limit?: number;
		sort?: number;
		search?: string;
	}): Promise<{
		items: User[];
		meta: { total: number; page: number; limit: number };
	}> {
		const q = new URLSearchParams();
		if (params?.page) q.set('page', String(params.page));
		if (params?.limit) q.set('limit', String(params.limit));
		if (params?.sort) q.set('sort', String(params.sort));
		if (params?.search) q.set('search', String(params.search));

		return chefifyAPI.get(`${BASE}/users?${q.toString()}`) as Promise<{
			items: User[];
			meta: { total: number; page: number; limit: number };
		}>;
	},

	async getRecipesPaginated(params?: {
		page?: number;
		limit?: number;
		sort?: number;
		search?: string;
	}): Promise<{
		items: Recipe[];
		meta: { total: number; page: number; limit: number };
	}> {
		const q = new URLSearchParams();
		if (params?.page) q.set('page', String(params.page));
		if (params?.limit) q.set('limit', String(params.limit));
		if (params?.sort) q.set('sort', String(params.sort));
		if (params?.search) q.set('search', String(params.search));

		return chefifyAPI.get<{
			items: Recipe[];
			meta: { total: number; page: number; limit: number };
		}>(`${BASE}/recipes?${q.toString()}`);
	},

	async getUserById(id: string): Promise<User> {
		return chefifyAPI.get<User>(`${BASE}/${id}`);
	},

	async getUserByEmail(email: string): Promise<User> {
		return chefifyAPI.get<User>(`${BASE}/email/${encodeURIComponent(email)}`);
	},

	async updateUser(
		id: string,
		payload: FormData | Partial<UserDTO>,
	): Promise<User> {
		return chefifyAPI.patch<User>(
			`${BASE}/${id}`,
			payload as unknown as Record<string, unknown>,
		);
	},

	async deleteUser(id: string): Promise<{ message?: string }> {
		return chefifyAPI.delete<{ message?: string }>(`${BASE}/${id}`);
	},
};

export default AdminService;

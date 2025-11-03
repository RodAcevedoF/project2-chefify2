import chefifyAPI from '@/lib/api';
import normalizeSuggestedRecipeResponse from '@/features/recipes/utils/normalizeSuggestedResponse';
import type { Recipe, RecipeDTO, UpdateRecipeDTO } from '@/types/recipe.types';
import type { QueryParams } from '@/types/common.types';

const BASE = '/recipe';

export const RecipeService = {
	async getRecipes(params: QueryParams): Promise<Recipe[]> {
		return chefifyAPI.get<Recipe[]>(`${BASE}`, { params });
	},

	async getRecipeById(id: string): Promise<Recipe> {
		return chefifyAPI.get<Recipe>(`${BASE}/${id}`);
	},

	async createRecipe(data: RecipeDTO | FormData): Promise<void> {
		if (data instanceof FormData) {
			return chefifyAPI.post<void>(`${BASE}`, data as unknown as FormData);
		}
		return chefifyAPI.post<void>(
			`${BASE}`,
			data as unknown as Record<string, unknown>,
		);
	},

	async updatedRecipe(data: UpdateRecipeDTO | FormData): Promise<void> {
		if (data instanceof FormData) {
			const id = data.get('_id') as string;
			return chefifyAPI.patch<void>(
				`${BASE}/${id}`,
				data as unknown as FormData,
			);
		}
		return chefifyAPI.patch<void>(`${BASE}/${data._id}`, data);
	},

	async getSuggestedRecipe(): Promise<RecipeDTO> {
		const resp = await chefifyAPI.get<unknown>(`${BASE}/suggested`);
		const unwrap = (v: unknown): unknown => {
			if (!v || typeof v !== 'object') return v;
			const obj = v as Record<string, unknown>;
			if ('recipe' in obj) return obj['recipe'];
			if ('data' in obj) {
				const inner = obj['data'];
				if (
					inner &&
					typeof inner === 'object' &&
					'recipe' in (inner as Record<string, unknown>)
				)
					return (inner as Record<string, unknown>)['recipe'];
				return inner ?? obj;
			}
			return obj;
		};

		const candidate = unwrap(resp);
		const normalized = normalizeSuggestedRecipeResponse(candidate);

		return normalized as unknown as RecipeDTO;
	},

	async deleteRecipe(id: string): Promise<void> {
		return chefifyAPI.delete<void>(`${BASE}/${id}`);
	},
};

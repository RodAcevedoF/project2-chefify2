import { IngredientRefSchema } from './ingredient.type';
import { z } from 'zod';

const RECIPE_CATEGORY_LIST = [
	'vegan',
	'carnivore',
	'high-fat',
	'baked',
	'vegetarian',
	'gluten-free',
	'low-carb',
	'keto',
	'paleo',
	'high-protein',
	'dessert',
	'breakfast',
	'lunch',
	'dinner',
	'snack',
	'soup',
	'pasta',
	'quick-meals',
	'salad',
	'mediterranean',
] as const;

export const RECIPE_CATEGORY_OPTIONS = Array.from(
	RECIPE_CATEGORY_LIST,
) as string[];

export const RecipeCategoriesSchema = z.enum(RECIPE_CATEGORY_LIST);

export const RecipeSchema = z.object({
	_id: z.string().optional(),
	userId: z
		.union([z.string(), z.object({ _id: z.string(), name: z.string() })])
		.optional(),
	title: z.string(),
	instructions: z
		.array(z.string())
		.min(1, 'At least one instruction is required'),
	ingredients: z.array(IngredientRefSchema),
	categories: z.array(RecipeCategoriesSchema),
	imgUrl: z.string().optional(),
	imgPublicId: z.string().optional(),
	servings: z.number(),
	likesCount: z.number().optional(),
	hasLiked: z.boolean().optional(),
	prepTime: z.number(),
	utensils: z.array(z.string()).optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});
export type Recipe = z.infer<typeof RecipeSchema>;

export type RecipeDTO = Partial<Recipe>;

export type UpdateRecipeDTO = Partial<RecipeDTO> & { _id: string };

export interface RecipeFormProps {
	onSuccess?: () => void;
	className?: string;
	toggleForm?: () => void;
}

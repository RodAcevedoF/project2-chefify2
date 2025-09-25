import { IngredientRefSchema } from './ingredient.type';
import { z } from 'zod';

export const RecipeCategoriesSchema = z.enum([
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
]);
export type RecipeCategory = z.infer<typeof RecipeCategoriesSchema>;
export const RecipeSchema = z.object({
	_id: z.string(),
	userId: z
		.union([z.string(), z.object({ _id: z.string(), name: z.string() })])
		.optional(),
	title: z.string(),
	ingredients: z.array(IngredientRefSchema),
	instructions: z.array(z.string()),
	categories: z.array(RecipeCategoriesSchema),
	imgUrl: z.string(),
	imgPublicId: z.string(),
	servings: z.number(),
	prepTime: z.number(),
	utensils: z.array(z.string()),
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

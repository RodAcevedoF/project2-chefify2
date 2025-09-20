import type { IngredientRefDTO } from './ingredient.type';

export enum RecipeCategories {
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
}

export interface Recipe {
	_id: string;
	userId?: { _id: string; name: string } | string;
	title: string;
	ingredients: IngredientRefDTO[];
	instructions: string[];
	categories: RecipeCategories;
	imgUrl: string;
	imgPublicId: string;
	servings: number;
	prepTime: number;
	utensils: string[];
	createdAt?: Date;
	updatedAt?: Date;
}

export type RecipeDTO = Partial<Recipe>;

export type UpdateRecipeDTO = Partial<RecipeDTO> & { _id: string };

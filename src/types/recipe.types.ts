import type { IngredientDTO } from './ingredient.type';

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
	userId?: string;
	title: string;
	ingredients: IngredientDTO[];
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

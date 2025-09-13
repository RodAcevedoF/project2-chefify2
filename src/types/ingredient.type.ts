export enum Units {
	GRAMS = 'gr',
	MILLILITERS = 'ml',
	TEASPOON = 'tsp',
	TABLESPOON = 'tbsp',
	CLOVES = 'cloves',
	UNIT = 'unit',
}

export interface Ingredient {
	_id: string;
	userId: string;
	name: string;
	unit: Units;
	updatedAt: Date;
	createdAt: Date;
}

export type IngredientDTO = Partial<Ingredient> & { quantity: number };

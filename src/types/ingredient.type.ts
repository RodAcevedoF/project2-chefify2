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

export interface IngredientRefDTO {
	_id: string;
	ingredient: Ingredient; // El objeto Ingredient completo
	quantity: number;
}

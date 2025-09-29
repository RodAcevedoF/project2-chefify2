import { z } from 'zod';

export const Units = z.enum(['gr', 'ml', 'tsp', 'tbsp', 'cloves', 'unit']);

export const IngredientSchema = z.object({
	_id: z.string(),
	userId: z.string(),
	name: z.string(),
	unit: Units,
	updatedAt: z.date(),
	createdAt: z.date(),
});
export type Ingredient = z.infer<typeof IngredientSchema>;

export type IngredientDTO = Partial<Ingredient>;

export const IngredientRefSchema = z.object({
	_id: z.string(),
	ingredient: IngredientSchema,
	quantity: z.number(),
});
export type IngredientRefDTO = z.infer<typeof IngredientRefSchema>;

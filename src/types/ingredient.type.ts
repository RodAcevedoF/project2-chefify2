import { z } from 'zod';

const optionalDateFromString = () =>
	z
		.preprocess(
			(val) => (typeof val === 'string' ? new Date(val) : val),
			z.date(),
		)
		.optional();

export const Units = z.enum(['gr', 'ml', 'tsp', 'tbsp', 'cloves', 'unit']);

export const IngredientSchema = z.object({
	_id: z.string(),
	userId: z.string().optional(),
	name: z.string(),
	unit: Units,
	updatedAt: optionalDateFromString(),
	createdAt: optionalDateFromString(),
});
export type Ingredient = z.infer<typeof IngredientSchema>;

export type IngredientDTO = Partial<Ingredient>;

export const IngredientRefSchema = z.object({
	_id: z.string().optional(),
	ingredient: z.union([z.string().length(24), IngredientSchema]),
	quantity: z.number(),
});
export type IngredientRefDTO = z.infer<typeof IngredientRefSchema>;

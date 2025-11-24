import type { ControllerRenderProps } from 'react-hook-form';
import type { Ingredient, IngredientRefDTO } from '@/types/ingredient.type';

export const useIngredientOperations = () => {
	const checkIfExists = (
		field: ControllerRenderProps,
		ingredientId: string,
	): boolean => {
		const current = Array.isArray(field.value) ? field.value : [];
		return current.some(
			(item: IngredientRefDTO) =>
				typeof item.ingredient === 'object' &&
				item.ingredient?._id === ingredientId,
		);
	};

	const addIngredient = (
		field: ControllerRenderProps,
		ingredient: Ingredient,
		quantity: number,
		onSuccess: () => void,
		onError: (message: string) => void,
	) => {
		const current = Array.isArray(field.value) ? field.value : [];
		const exists = current.some(
			(item: IngredientRefDTO) => item._id === ingredient._id,
		);

		if (exists) {
			onError('Ingredient already add');
			return;
		}

		if (isNaN(quantity) || quantity <= 0) {
			onError('Enter a valid quantity');
			return;
		}

		const safeIngredient = {
			_id: ingredient._id,
			name: ingredient.name,
			unit: ingredient.unit,
		} as unknown as Ingredient;

		const ingredientRef: IngredientRefDTO = {
			ingredient: safeIngredient,
			quantity,
		};

		field.onChange([...current, ingredientRef]);
		onSuccess();
	};

	const removeIngredient = (field: ControllerRenderProps, index: number) => {
		const newValue = Array.isArray(field.value)
			? field.value.filter((_: unknown, i: number) => i !== index)
			: [];
		field.onChange(newValue);
	};

	return {
		checkIfExists,
		addIngredient,
		removeIngredient,
	};
};

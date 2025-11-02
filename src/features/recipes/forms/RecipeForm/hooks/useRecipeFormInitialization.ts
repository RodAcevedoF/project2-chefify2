import { useEffect } from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import type { Recipe, RecipeDTO } from '@/types/recipe.types';

interface UseRecipeFormInitializationProps {
	initialData?: Partial<Recipe>;
	setValue: UseFormSetValue<RecipeDTO>;
	setImgPreview: (preview: string | null) => void;
}

export const useRecipeFormInitialization = ({
	initialData,
	setValue,
	setImgPreview,
}: UseRecipeFormInitializationProps) => {
	useEffect(() => {
		if (!initialData) return;

		// Populate basic fields
		if (initialData.title) {
			setValue('title', initialData.title as string);
		}

		if (initialData.imgUrl) {
			setImgPreview(initialData.imgUrl as string);
			setValue('imgUrl', initialData.imgUrl as string);
		}
		if (initialData.imgPublicId) {
			setValue('imgPublicId', initialData.imgPublicId as string);
		}

		if (initialData.servings !== undefined) {
			setValue('servings', initialData.servings as number);
		}
		if (initialData.prepTime !== undefined) {
			setValue('prepTime', initialData.prepTime as number);
		}

		if (initialData.categories) {
			setValue(
				'categories',
				initialData.categories as unknown as Recipe['categories'],
			);
		}
		if (initialData.utensils) {
			setValue('utensils', initialData.utensils as string[]);
		}
		if (initialData.instructions) {
			setValue('instructions', initialData.instructions as string[]);
		}
		if (initialData.ingredients) {
			setValue(
				'ingredients',
				initialData.ingredients as unknown as Recipe['ingredients'],
			);
		}
	}, [initialData, setValue, setImgPreview]);
};

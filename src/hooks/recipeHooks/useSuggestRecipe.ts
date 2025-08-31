import { useQuery } from '@tanstack/react-query';
import { RecipeService } from '@/services/recipe.service';
import type { AxiosError } from 'axios';
import type { RecipeDTO } from '@/types/recipe.types';

export const UseSuggestRecipe = () => {
	return useQuery<RecipeDTO, AxiosError>({
		queryKey: ['recipe', 'suggestion'],
		queryFn: async () => await RecipeService.getSuggestedRecipe(),
		retry: false,
	});
};

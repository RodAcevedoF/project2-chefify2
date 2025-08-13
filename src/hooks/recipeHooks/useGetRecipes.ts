import { useQuery } from '@tanstack/react-query';
import { RecipeService } from '../../services/recipe.service';
import type { AxiosError } from 'axios';
import type { Recipe } from '../../types/recipe.types';

interface RecipeError {
  message: string;
  statusCode: number;
}

interface RecipeResponse {
  data: Recipe[];
  statusCode: number;
}

export const useGetRecipes = () => {
  return useQuery<RecipeResponse, AxiosError<RecipeError>>({
    queryKey: ['recipe'],
    queryFn: async () => {
      const response = await RecipeService.getRecipes();
      return response;
    },
    retry: false,
  });
};

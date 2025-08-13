import { useEffect, useState } from 'react';
import type { Recipe } from '../../../types/recipe.types';
import { useGetRecipes } from '../../../hooks/recipeHooks/useGetRecipes';
import { ListItem, Title } from '../cards/ListItem';

const RecipeAside = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { data, isLoading, error, isError } = useGetRecipes();

  useEffect(() => {
    if (data) setRecipes(data.data);
  }, [data]);
  return (
    <aside className='flex w-1/3 min-h-[60vh] border-2 border-red-500'>
      <ul>
        RecipeContainer
        {isLoading && <p>Loading recipes...</p>}
        {isError && <p>Error: {error?.message || 'There was an error'}</p>}
        {recipes.map((recipe) => {
          return (
            <ListItem key={recipe._id}>
              <Title title={recipe.title} />
            </ListItem>
          );
        })}
      </ul>
    </aside>
  );
};

export default RecipeAside;

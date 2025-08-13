import chefifyApi from '../lib/api';

export const RecipeService = {
  async getRecipes() {
    const recipes = await chefifyApi.get('/recipe');
    return recipes.data;
  },
};

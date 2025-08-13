export interface IngredientInRecipe {
  ingredient: string; // Assuming this is a string ID for the ingredient
  quantity: number; // Quantity of the ingredient
}

export const RecipeCategories = [
  'vegan',
  'carnivore',
  'high-fat',
  'baked',
  'vegetarian',
  'gluten-free',
  'low-carb',
  'keto',
  'paleo',
  'high-protein',
  'dessert',
  'breakfast',
  'lunch',
  'dinner',
  'snack',
  'soup',
  'pasta',
  'quick-meals',
  'salad',
  'mediterranean',
] as const;

export interface Recipe {
  _id: string;
  userId?: string;
  title: string;
  ingredients: IngredientInRecipe[];
  instructions: string[];
  categories: (typeof RecipeCategories)[number][];
  imgUrl: string;
  imgPublicId: string;
  servings: number;
  prepTime: number;
  utensils: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

/* eslint-disable react-refresh/only-export-components */
import { AuthModal } from '@/features/auth/components/nav/auth.modal';
import { RecipeModal } from '@/features/recipes/components/modals/recipe.modal';
import ProfileModal from '@/features/profile/components/modal/ProfileModal';
import ImgModal from '@/features/recipes/components/modals/image.modal';
import DeleteModal from '@/features/recipes/components/modals/delete.modal';
import SuggestRecipeModal from '@/features/recipes/components/modals/suggest.modal';
import React from 'react';

export const MODALS: Record<string, React.ComponentType<unknown>> = {
	auth: AuthModal as React.ComponentType<unknown>,
	recipe: RecipeModal as React.ComponentType<unknown>,
	profileEdit: ProfileModal as React.ComponentType<unknown>,
	recipeImg: ImgModal as React.ComponentType<unknown>,
	recipeDelete: DeleteModal as React.ComponentType<unknown>,
	recipeSuggest: SuggestRecipeModal as React.ComponentType<unknown>,
};

export default MODALS;

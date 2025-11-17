import React from 'react';
import { AuthModal } from '@/features/auth/components/nav/auth.modal';
import { RecipeModal } from '@/features/recipes/components/modals/recipe.modal';
import ProfileModal from '@/features/profile/components/modal/ProfileModal';
import ImgModal from '@/features/common/components/modals/common/image.modal';
import DeleteModal from '@/features/recipes/components/modals/delete.modal';
import DeleteUserModal from '@/features/admin/components/modals/deleteUser.modal';
import ViewUserModal from '@/features/admin/components/modals/viewUser.modal';
import ViewRecipeModal from '@/features/admin/components/modals/viewRecipe.modal';
import SuggestRecipeModal from '@/features/recipes/components/modals/suggest.modal';
import SettingsForm from '@/features/profile/components/forms/SettingsForm';
import ForgotPasswordForm from '@/features/auth/components/forgot/ForgotPasswordForm';
import ContactModal from '@/features/common/components/modals/contact.modal';

export const MODALS: Record<string, React.ComponentType<unknown>> = {
	auth: AuthModal as React.ComponentType<unknown>,
	recipe: RecipeModal as React.ComponentType<unknown>,
	profileEdit: ProfileModal as React.ComponentType<unknown>,
	generalImg: ImgModal as React.ComponentType<unknown>,
	recipeDelete: DeleteModal as React.ComponentType<unknown>,
	adminUserDelete: DeleteUserModal as React.ComponentType<unknown>,
	adminUserView: ViewUserModal as React.ComponentType<unknown>,
	adminRecipeView: ViewRecipeModal as React.ComponentType<unknown>,
	recipeSuggest: SuggestRecipeModal as React.ComponentType<unknown>,
	settings: SettingsForm as React.ComponentType<unknown>,
	forgotPassword: ForgotPasswordForm as React.ComponentType<unknown>,
	contact: ContactModal as React.ComponentType<unknown>,
	/* resetPassword modal removed in favor of a canonical page */
};

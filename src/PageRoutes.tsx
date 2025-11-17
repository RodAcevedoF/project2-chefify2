import { Routes, Route, useLocation } from 'react-router-dom';
import PageTransition from '@/features/common/components/PageTransition';

import { Home } from '@/features/home/Home';
import PrivateHome from '@/features/home/PrivateHome';
import ResetPasswordPage from '@/features/auth/pages/ResetPasswordPage';

import AdminRoute from '@/features/admin/AdminRoute';
import AdminPage from '@/features/admin/AdminPage';
import AdminUsersPage from '@/features/admin/components/tables/AdminUsersTable';
import AdminRecipesPage from '@/features/admin/components/tables/AdminRecipesTable';
import UploadsPage from '@/features/admin/UploadsPage';

import ProtectedRoute from '@/features/common/components/layout/ProtectedRoute';
import RecipeDetail from '@/features/recipes/components/cards/RecipeDetail';
import EmptyRecipe from '@/features/recipes/components/cards/EmptyRecipe';
import { RecipeLayout } from '@/features/recipes/Recipe';

import { ProfileLayout } from '@/features/profile/Profile';
import { NotFound } from '@/features/notFound/NotFound';

export default function PageRoutes() {
	const location = useLocation();

	return (
		<Routes location={location} key={location.pathname}>
			{/* PUBLIC */}
			<Route
				path='/'
				element={
					<PageTransition>
						<Home />
					</PageTransition>
				}
			/>

			<Route
				path='/login'
				element={
					<PageTransition>
						<Home />
					</PageTransition>
				}
			/>

			<Route
				path='/reset-password'
				element={
					<PageTransition>
						<ResetPasswordPage />
					</PageTransition>
				}
			/>

			{/* ADMIN */}
			<Route element={<AdminRoute />}>
				<Route
					path='/admin'
					element={
						<PageTransition>
							<AdminPage />
						</PageTransition>
					}
				/>
				<Route
					path='/admin/users'
					element={
						<PageTransition>
							<AdminUsersPage />
						</PageTransition>
					}
				/>
				<Route
					path='/admin/recipes'
					element={
						<PageTransition>
							<AdminRecipesPage />
						</PageTransition>
					}
				/>
				<Route
					path='/admin/uploads'
					element={
						<PageTransition>
							<UploadsPage />
						</PageTransition>
					}
				/>
			</Route>

			{/* PROTECTED */}
			<Route element={<ProtectedRoute />}>
				<Route
					path='/home'
					element={
						<PageTransition>
							<PrivateHome />
						</PageTransition>
					}
				/>

				<Route path='/recipes' element={<RecipeLayout />}>
					<Route
						index
						element={
							<PageTransition>
								<EmptyRecipe />
							</PageTransition>
						}
					/>
					<Route
						path=':id'
						element={
							<PageTransition>
								<RecipeDetail />
							</PageTransition>
						}
					/>
				</Route>

				<Route
					path='/profile'
					element={
						<PageTransition>
							<ProfileLayout />
						</PageTransition>
					}
				/>
			</Route>

			{/* 404 */}
			<Route
				path='*'
				element={
					<PageTransition>
						<NotFound />
					</PageTransition>
				}
			/>
		</Routes>
	);
}

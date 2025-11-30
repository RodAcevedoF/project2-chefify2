import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PageTransition from '@/features/common/components/PageTransition';
import { AnimatePresence } from 'framer-motion';
import { CircularProgress, Box } from '@mui/material';

const Home = lazy(() =>
	import('@/features/home/Home').then((m) => ({ default: m.Home })),
);
const PrivateHome = lazy(() => import('@/features/home/PrivateHome'));
const ResetPasswordPage = lazy(
	() => import('@/features/auth/pages/ResetPasswordPage'),
);

const AdminRoute = lazy(() => import('@/features/admin/AdminRoute'));
const AdminPage = lazy(() => import('@/features/admin/AdminPage'));
const AdminUsersPage = lazy(
	() => import('@/features/admin/components/tables/AdminUsersTable'),
);
const AdminRecipesPage = lazy(
	() => import('@/features/admin/components/tables/AdminRecipesTable'),
);
const UploadsPage = lazy(() => import('@/features/admin/UploadsPage'));

const ProtectedRoute = lazy(
	() => import('@/features/common/components/layout/ProtectedRoute'),
);
const RecipeDetail = lazy(
	() => import('@/features/recipes/components/cards/RecipeDetail'),
);
const EmptyRecipe = lazy(
	() => import('@/features/recipes/components/cards/EmptyRecipe'),
);
const RecipeLayout = lazy(() =>
	import('@/features/recipes/Recipe').then((m) => ({
		default: m.RecipeLayout,
	})),
);

const ProfileLayout = lazy(() =>
	import('@/features/profile/Profile').then((m) => ({
		default: m.ProfileLayout,
	})),
);
const NotFound = lazy(() =>
	import('@/features/notFound/NotFound').then((m) => ({ default: m.NotFound })),
);

// Loading fallback component
const LoadingFallback = () => (
	<Box
		sx={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			minHeight: '50vh',
			width: '100%',
		}}>
		<CircularProgress />
	</Box>
);

export default function PageRoutes() {
	const location = useLocation();

	return (
		<AnimatePresence mode='wait' initial={false}>
			<Suspense fallback={<LoadingFallback />}>
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
			</Suspense>
		</AnimatePresence>
	);
}

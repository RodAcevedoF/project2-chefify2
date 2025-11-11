import './index.css';
import { Navbar } from '@/features/common/components/layout/Navbar';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '@/features/common/components/PageTransition';
// logged context used in redirected component (extracted)
import Toast from '@/features/common/components/toasts/Toast';
import RedirectOnLogin from '@/features/common/components/RedirectOnLogin';
import { RecipeLayout } from '@/features/recipes/Recipe';
import { NotFound } from '@/features/notFound/NotFound';
import { Home } from '@/features/home/Home';
import { Footer } from '@/features/common/components/layout/Footer';
import ProtectedRoute from '@/features/common/components/layout/ProtectedRoute';
import RecipeDetail from '@/features/recipes/components/cards/RecipeDetail';
import EmptyRecipe from '@/features/recipes/components/cards/EmptyRecipe';
import { ProfileLayout } from '@/features/profile/Profile';
import { Box } from '@mui/material';
import { ModalRoot } from '@/features/common/components/modals/ModalRoot';
import ResetPasswordPage from '@/features/auth/pages/ResetPasswordPage';
import AdminPage from '@/features/admin/AdminPage';
import AdminRoute from '@/features/admin/AdminRoute';
import AdminUsersPage from '@/features/admin/components/tables/AdminUsersTable';
import AdminRecipesPage from '@/features/admin/components/tables/AdminRecipesTable';
import UploadsPage from '@/features/admin/UploadsPage';
import { ScrollProvider } from './contexts/scrollContext/scroll.provider';

function App() {
	return (
		<>
			<Router>
				<ScrollProvider>
					{(() => {
						const ToastFromLocation = () => {
							const location = useLocation();
							const navigate = useNavigate();
							const [open, setOpen] = useState(false);
							type ToastNavState = {
								toast?: {
									message: string;
									severity?: 'error' | 'info' | 'success' | 'warning';
								};
							};
							const toast = (location.state as ToastNavState)?.toast;
							useEffect(() => {
								if (toast) setOpen(true);
							}, [toast]);
							if (!toast) return null;
							return (
								<Toast
									open={open}
									message={toast.message}
									severity={toast.severity}
									onClose={() => {
										setOpen(false);
										navigate(location.pathname, { replace: true, state: {} });
									}}
								/>
							);
						};
						return <ToastFromLocation />;
					})()}
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							minHeight: '100vh',
							justifyContent: 'space-between',
							alignContent: 'center',
							width: '100%',
						}}>
						<Box component='header'>
							<Navbar />
						</Box>
						<RedirectOnLogin />
						<Box component='main'>
							{/* Animated routes: AnimatePresence must live inside Router and use location */}
							{(() => {
								const AnimatedRoutes = () => {
									const location = useLocation();
									return (
										<AnimatePresence mode='wait' initial={false}>
											<Routes location={location}>
												<Route
													path='/'
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

												<Route path='/admin' element={<AdminRoute />}>
													<Route
														index
														element={
															<PageTransition>
																<AdminPage />
															</PageTransition>
														}
													/>
													<Route
														path='users'
														element={
															<PageTransition>
																<AdminUsersPage />
															</PageTransition>
														}
													/>
													<Route
														path='recipes'
														element={
															<PageTransition>
																<AdminRecipesPage />
															</PageTransition>
														}
													/>
													<Route
														path='uploads'
														element={
															<PageTransition>
																<UploadsPage />
															</PageTransition>
														}
													/>
												</Route>

												<Route element={<ProtectedRoute />}>
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

												<Route
													path='*'
													element={
														<PageTransition>
															<NotFound />
														</PageTransition>
													}
												/>
											</Routes>
										</AnimatePresence>
									);
								};

								return <AnimatedRoutes />;
							})()}
						</Box>
						<Box component='footer'>
							<Footer />
						</Box>
					</Box>
					<ModalRoot />
				</ScrollProvider>
			</Router>
		</>
	);
}

export default App;

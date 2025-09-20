import './index.css';
import { Navbar } from '@/features/common/components/layout/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import { ScrollProvider } from './contexts/scrollContext/scroll.provider';

function App() {
	return (
		<>
			<Router>
				<ScrollProvider>
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

						{/* Main */}
						<Box component='main'>
							<Routes>
								<Route path='/' element={<Home />} />
								<Route element={<ProtectedRoute />}>
									<Route path='/recipes' element={<RecipeLayout />}>
										<Route index element={<EmptyRecipe />} />
										<Route path=':id' element={<RecipeDetail />} />
									</Route>
									<Route path='/profile' element={<ProfileLayout />} />
								</Route>
								<Route path='*' element={<NotFound />} />
							</Routes>
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

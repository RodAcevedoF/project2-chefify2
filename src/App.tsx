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
import { Box, Container } from '@mui/material';
import { ModalRoot } from '@/features/common/components/modals/ModalRoot';

function App() {
	return (
		<>
			<Router>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						minHeight: '100vh',
						width: '100%',
						justifyContent: 'space-between',
						overflowX: 'hidden',
						alignContent: 'center',
					}}>
					<Box component='header'>
						<Navbar />
					</Box>

					{/* Main */}
					<Container
						component='main'
						maxWidth={false}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							flexGrow: 1,
						}}>
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
					</Container>
					<Box component='footer'>
						<Footer />
					</Box>
				</Box>
				<ModalRoot />
			</Router>
		</>
	);
}

export default App;

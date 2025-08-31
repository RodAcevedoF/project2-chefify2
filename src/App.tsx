import './index.css';
import { Navbar } from '@/components/layout/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecipeLayout } from '@/pages/Recipe';
import { NotFound } from '@/pages/NotFound';
import { Home } from '@/pages/Home';
import { Footer } from '@/components/layout/Footer';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import RecipeDetail from '@/components/ui/cards/RecipeDetail';
import EmptyRecipe from '@/components/ui/cards/EmptyRecipe';
import { ProfileLayout } from '@/pages/Profile';
import { Box, Container } from '@mui/material';

function App() {
	return (
		<Router>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh',
					width: '100%',
					justifyContent: 'space-between',
					overflowX: 'hidden',
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

				{/* Footer */}
				<Box component='footer'>
					<Footer />
				</Box>
			</Box>
		</Router>
	);
}

export default App;

import { memo } from 'react';
import type { Recipe } from '@/types/recipe.types';
import { useGetRecipes } from '@/features/recipes/hooks';
import { ChefHat, Utensils } from 'lucide-react';
import {
	Box,
	ListItemButton,
	ListItemText,
	Drawer,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { recipeStyles } from '../../recipe.theme';
import { capitalize } from '@/features/common/utils/capitalize.helper';
import { useDrawerContext } from '../../drawer-context/drawer.context';

const RecipeAside = memo(() => {
	const { data, isLoading, error, isError } = useGetRecipes();
	const navigate = useNavigate();
	const theme = useTheme();
	const rs = recipeStyles(theme);
	const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
	const { drawerOpen, setDrawerOpen } = useDrawerContext();

	const handleGetDetails = (id: string) => {
		navigate(`/recipes/${id}`);
		setDrawerOpen(false);
	};

	const asideContent = (
		<Box sx={rs.boxContent}>
			<Typography sx={rs.title}>
				Last recipes <ChefHat />
			</Typography>
			{isLoading && <Typography sx={rs.title}>Loading recipes...</Typography>}
			{isError && (
				<Typography color='error' sx={{ fontFamily: 'Alegreya' }}>
					Error: {error?.message || 'There was an error'}
				</Typography>
			)}
			{data?.slice(0, 8).map((recipe: Recipe) => (
				<ListItemButton
					key={recipe._id}
					onClick={() => recipe._id && handleGetDetails(recipe._id)}
					sx={rs.recipeAside.listItemBtn}>
					<Box>
						<Utensils
							width={15}
							height={15}
							color={theme.palette.primary.main}
						/>
					</Box>
					<ListItemText
						primary={capitalize(recipe.title)}
						slotProps={{ primary: rs.recipeAside.primaryTypoProps }}
						sx={rs.recipeAside.listItemTxt}
					/>
				</ListItemButton>
			))}
		</Box>
	);

	if (isMdDown) {
		return (
			<>
				<Drawer
					anchor='left'
					open={drawerOpen}
					onClose={() => setDrawerOpen(false)}
					slotProps={{ paper: rs.recipeAside.drawerProps }}>
					{asideContent}
				</Drawer>
			</>
		);
	}

	return (
		<Box component='aside' sx={rs.recipeAside}>
			{asideContent}
		</Box>
	);
});

export default RecipeAside;

import { memo } from 'react';
import type { Recipe } from '@/types/recipe.types';
import { useGetRecipes } from '@/features/recipes/hooks/useGetRecipes';
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

	const primaryTypographyProps = {
		sx: {
			color: theme.palette.background.paper,
			fontWeight: 'bolder',
			transition: 'transform 0.2s',
			'&:hover': {
				transform: 'scale(1.05)',
			},
		},
	};

	const drawerProps = {
		sx: {
			backgroundColor: theme.palette.secondary.light,
			width: 250,
			paddingTop: 5,
			minHeight: '100vh',
		},
	};

	const asideContent = (
		<Box sx={rs.boxContent}>
			<Typography sx={rs.title}>
				Last recipes <ChefHat />
			</Typography>
			{isLoading && <Typography sx={rs.title}>Loading recipes...</Typography>}
			{isError && (
				<Typography color='error'>
					Error: {error?.message || 'There was an error'}
				</Typography>
			)}
			{data?.map((recipe: Recipe) => (
				<ListItemButton
					key={recipe._id}
					onClick={() => handleGetDetails(recipe._id)}
					sx={{
						borderRadius: 2,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'justify-between',
						gap: 2,
						width: '100%',
					}}>
					<Box>
						<Utensils width={15} height={15} />
					</Box>
					<ListItemText
						primary={capitalize(recipe.title)}
						slotProps={{ primary: primaryTypographyProps }}
						sx={{
							color: theme.palette.background.paper,
							borderRadius: 2,
							p: 0.5,
							transition: 'background 0.2s',
						}}
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
					slotProps={{ paper: drawerProps }}>
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

import { memo, useState } from 'react';
import type { Recipe } from '@/types/recipe.types';
import { useGetRecipes } from '@/features/recipes/hooks/useGetRecipes';
import {
	Box,
	ListItemButton,
	ListItemText,
	Drawer,
	IconButton,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { MenuIcon } from 'lucide-react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { recipeStyles } from '../../recipe.theme';

const RecipeAside = memo(() => {
	const { data, isLoading, error, isError } = useGetRecipes();
	const navigate = useNavigate();
	const theme = useTheme();
	const rs = recipeStyles(theme);
	const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleGetDetails = (id: string) => {
		navigate(`/recipes/${id}`);
		setDrawerOpen(false);
	};

	const primaryTypographyProps = {
		sx: { color: theme.palette.background.paper },
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
			<Typography sx={rs.title}>Last recipes</Typography>
			{isLoading && <Typography sx={rs.title}>Loading recipes...</Typography>}
			{isError && (
				<Typography color='error'>
					Error: {error?.message || 'There was an error'}
				</Typography>
			)}
			{data?.map((recipe: Recipe) => (
				<ListItemButton
					key={recipe._id}
					onClick={() => handleGetDetails(recipe._id)}>
					<ListItemText
						primary={recipe.title}
						slotProps={{ primary: primaryTypographyProps }}
						sx={{
							color: theme.palette.background.paper,
							borderRadius: 2,
							p: 1,
							fontWeight: 'bold',
							transition: 'background 0.2s',
							'&:hover': {
								backgroundColor: theme.palette.primary.main,
								color: theme.palette.secondary.main,
							},
						}}
					/>
				</ListItemButton>
			))}
		</Box>
	);

	if (isMdDown) {
		return (
			<>
				<IconButton onClick={() => setDrawerOpen(true)} sx={{ m: 2 }}>
					<MenuIcon />
				</IconButton>
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

import { memo, useState, useMemo } from 'react';
import type { Recipe } from '@/types/recipe.types';
import { useGetRecipes } from '@/features/recipes/hooks';
import { useGetSavedRecipes } from '@/features/profile/hooks/useUser';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
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
	const navigate = useNavigate();
	const theme = useTheme();
	const rs = recipeStyles(theme);
	const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
	const { drawerOpen, setDrawerOpen } = useDrawerContext();

	const handleGetDetails = (id: string) => {
		navigate(`/recipes/${id}`);
		setDrawerOpen(false);
	};

	const [mode, setMode] = useState<'latest' | 'mostVoted' | 'favorites'>(
		'latest',
	);

	const handleMode = (
		_event: React.MouseEvent<HTMLElement>,
		value: 'latest' | 'mostVoted' | 'favorites',
	) => {
		if (value) setMode(value);
	};

	const {
		data: latestData,
		isLoading,
		error,
		isError,
	} = useGetRecipes({ limit: 8 });
	const { data: bulkData } = useGetRecipes({ limit: 200 });
	const { data: savedRecipes } = useGetSavedRecipes();

	const displayed = useMemo(() => {
		switch (mode) {
			case 'mostVoted':
				return bulkData
					? [...bulkData]
							.sort((a, b) => (b.likesCount ?? 0) - (a.likesCount ?? 0))
							.slice(0, 8)
					: [];
			case 'favorites':
				return savedRecipes ?? [];
			case 'latest':
			default:
				return latestData ?? [];
		}
	}, [mode, latestData, bulkData, savedRecipes]);

	const asideContent = (
		<Box sx={rs.boxContent}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					justifyContent: 'space-between',
					mb: 1,
				}}>
				<Typography sx={rs.title}>
					Recipes <ChefHat />
				</Typography>
				<ToggleButtonGroup
					value={mode}
					exclusive
					onChange={handleMode}
					size='small'
					sx={{ backdropFilter: 'blur(10px)' }}>
					<ToggleButton
						value='latest'
						sx={{
							fontFamily: 'Alegreya',
							width: '65px',
							fontWeight: 'bolder',
							color: theme.palette.primary.main,
							'&.Mui-selected': {
								color: theme.palette.background.default,
							},
						}}>
						Last
					</ToggleButton>
					<ToggleButton
						value='mostVoted'
						sx={{
							fontFamily: 'Alegreya',
							width: '65px',
							fontWeight: 'bolder',
							color: theme.palette.primary.main,
							'&.Mui-selected': {
								color: theme.palette.background.default,
							},
						}}>
						Top
					</ToggleButton>
					<ToggleButton
						value='favorites'
						sx={{
							fontFamily: 'Alegreya',
							width: '65px',
							fontWeight: 'bolder',
							color: theme.palette.primary.main,
							'&.Mui-selected': {
								color: theme.palette.background.default,
							},
						}}>
						My fav
					</ToggleButton>
				</ToggleButtonGroup>
			</Box>
			{isLoading && <Typography sx={rs.title}>Loading recipes...</Typography>}
			{isError && (
				<Typography color='error' sx={{ fontFamily: 'Alegreya' }}>
					Error: {error?.message || 'There was an error'}
				</Typography>
			)}
			{displayed?.slice(0, 8).map((recipe: Recipe) => (
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

import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Typography,
	useTheme,
} from '@mui/material';
import { CookingPot } from 'lucide-react';

const NoSavedRecipesCard = () => {
	const theme = useTheme();

	return (
		<Card elevation={0} sx={{ width: '100%' }}>
			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 1,
					py: 2,
				}}>
				<Box sx={{ bgcolor: 'action.hover', borderRadius: '50%', p: 1.25 }}>
					<CookingPot size={28} color={theme.palette.primary.main} />
				</Box>

				<Typography variant='h5' fontWeight={700}>
					No saved recipes
				</Typography>

				<Typography variant='body1' color='primary' align='center'>
					You haven't saved any recipes yet. Save recipes you like and they'll
					appear here.
				</Typography>

				<Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
					<CardMedia
						component='img'
						src='/emptyrecipes.png'
						alt='Browse Recipes'
						sx={{ width: '70%', borderRadius: 2 }}
					/>
				</Box>
			</CardContent>
		</Card>
	);
};

export default NoSavedRecipesCard;

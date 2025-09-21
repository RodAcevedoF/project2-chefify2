import { Box, Card, Typography } from '@mui/material';
import { Carousel } from '../carousels/Carousel';
import { ChefHat } from 'lucide-react';

const EmptyRecipe = () => (
	<Card
		sx={{
			display: 'flex',
			p: 4,
			boxShadow: 6,
			borderRadius: 4,
			flexDirection: 'column',
			gap: 2,
			height: '100%',
			width: 'fit-content',
			minHeight: '70vh',
		}}>
		<Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
			<ChefHat width={50} color={'whitesmoke'} />
			<Typography
				variant='h4'
				sx={{
					fontWeight: 'bolder',
					fontSize: { xs: 30, md: 40 },
				}}>
				Select a recipe
			</Typography>
		</Box>
		<Typography sx={{ fontSize: { xs: 15, md: 18 } }}>
			Choose a recipe from the list or try an AI generated one!
		</Typography>
		<Carousel />
	</Card>
);

export default EmptyRecipe;

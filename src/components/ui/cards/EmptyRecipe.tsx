import { Box, Typography } from '@mui/material';

const EmptyRecipe = () => (
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			height: '100%',
		}}>
		<Typography variant='h4'>Select a recipe</Typography>
		<Typography variant='subtitle1'>
			Choose a recipe from the list to see its details
		</Typography>
	</Box>
);

export default EmptyRecipe;

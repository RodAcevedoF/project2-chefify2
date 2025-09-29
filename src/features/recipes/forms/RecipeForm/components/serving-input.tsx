import type { RecipeDTO } from '@/types/recipe.types';
import { Box, TextField, Typography, useTheme } from '@mui/material';
import type { UseFormRegister } from 'react-hook-form';
import { recipeFormStyles } from '../recipe-form.theme';

export interface ServingInputProps {
	register: UseFormRegister<RecipeDTO>;
}

const ServingInput = (props: ServingInputProps) => {
	const theme = useTheme();
	const rs = recipeFormStyles(theme, {});
	return (
		<Box sx={rs.form.box.inBox}>
			<TextField
				label='Servings'
				type='number'
				size='small'
				{...props.register('servings', { valueAsNumber: true })}
				slotProps={{
					input: { sx: { paddingRight: '44px' } },
				}}
				fullWidth
			/>
			<Typography variant='body2' color='text.secondary' sx={rs.form.box.typo}>
				people
			</Typography>
		</Box>
	);
};

export default ServingInput;

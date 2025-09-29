import { Box, TextField, Typography, useTheme } from '@mui/material';
import { recipeFormStyles } from '../recipe-form.theme';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { RecipeDTO } from '@/types/recipe.types';

export interface PrepTimeInputProps {
	register: UseFormRegister<RecipeDTO>;
	errors: FieldErrors<RecipeDTO>;
}

const PrepTimeInput = ({ register, errors }: PrepTimeInputProps) => {
	const theme = useTheme();
	const rs = recipeFormStyles(theme, {});
	return (
		<Box sx={rs.form.box.inBox}>
			<TextField
				label='Prep time'
				type='number'
				size='small'
				{...register('prepTime', { valueAsNumber: true })}
				error={!!errors.prepTime}
				slotProps={{
					input: { sx: { paddingRight: '44px' } },
				}}
				fullWidth
			/>
			<Typography variant='body2' color='text.secondary' sx={rs.form.box.typo}>
				min
			</Typography>
		</Box>
	);
};

export default PrepTimeInput;

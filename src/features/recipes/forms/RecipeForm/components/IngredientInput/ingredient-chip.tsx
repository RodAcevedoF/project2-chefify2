import { Box, Chip } from '@mui/material';
import type { IngredientRefDTO } from '@/types/ingredient.type';

interface Props {
	value?: IngredientRefDTO[];
	onDelete: (idx: number) => void;
}

export default function IngredientsChips({ value = [], onDelete }: Props) {
	return (
		<Box
			sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pr: 1, width: '100%' }}>
			{value.map((ingRef, idx) => (
				<Chip
					key={ingRef._id ?? idx}
					label={`${ingRef.quantity} ${
						typeof ingRef.ingredient === 'object'
							? ingRef.ingredient.unit ?? ''
							: ''
					} ${
						typeof ingRef.ingredient === 'object' ? ingRef.ingredient.name : ''
					}`}
					onDelete={() => onDelete(idx)}
					color='primary'
					variant='outlined'
					size='small'
					sx={{ maxWidth: '250px' }}
				/>
			))}
		</Box>
	);
}

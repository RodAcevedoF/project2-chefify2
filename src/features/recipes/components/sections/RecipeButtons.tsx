import { ButtonUsage } from '@/features/common/components/ui/buttons/MainButton';
import { Box } from '@mui/material';

const RecipeButtons = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				gap: 2,
			}}>
			<ButtonUsage label='Edit' />
			<ButtonUsage label='Delete' />
		</Box>
	);
};

export default RecipeButtons;

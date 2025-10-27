import { Box, Typography } from '@mui/material';

type UtensilsProps = {
	utensils: string[];
};

const Utensils = ({ utensils }: UtensilsProps) => {
	return (
		<Box>
			<Typography variant='h6' fontFamily={'Alegreya'} mb={1}>
				Utensils:
			</Typography>
			{Array.isArray(utensils) && (
				<Typography variant='subtitle1' mb={1}>
					{utensils.join(', ')}
				</Typography>
			)}
		</Box>
	);
};

export default Utensils;

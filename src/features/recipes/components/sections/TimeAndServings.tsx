import { Box, Typography, useTheme } from '@mui/material';
import { History, UtensilsCrossed } from 'lucide-react';

type TimeAndServingsProps = {
	prepTime: number;
	servings: number;
};

const TimeAndServings = ({ prepTime, servings }: TimeAndServingsProps) => {
	const theme = useTheme();
	const iconColor = theme.palette.primary.main;
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'flex-start',
				flexDirection: 'column',
				gap: 1,
				py: 1,
				mb: 1,
			}}>
			<Typography
				variant='subtitle1'
				sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<History color={iconColor} />
				<strong>Prep time: </strong>
				{prepTime} min
			</Typography>

			<Typography
				variant='subtitle1'
				sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<UtensilsCrossed color={iconColor} />
				<strong>Servings: </strong>
				{servings}
			</Typography>
		</Box>
	);
};

export default TimeAndServings;

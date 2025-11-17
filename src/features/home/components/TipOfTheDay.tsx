import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const TipOfTheDay: React.FC = () => {
	const tip = 'Use seasonal ingredients — they cost less and taste better.';

	return (
		<Paper sx={{ p: 2, borderRadius: 2 }} elevation={5}>
			<Typography variant='h6' gutterBottom>
				Tip of the day
			</Typography>
			<Box>
				<Typography variant='body1'>{tip}</Typography>
			</Box>
		</Paper>
	);
};

export default TipOfTheDay;

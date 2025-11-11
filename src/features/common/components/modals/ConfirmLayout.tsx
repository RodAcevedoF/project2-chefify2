import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

type Props = {
	title: React.ReactNode;
	message?: React.ReactNode;
	error?: React.ReactNode;
	minWidth?: number;
	children?: React.ReactNode; // actions area
};

const ConfirmLayout = ({
	title,
	message,
	error,
	minWidth = 320,
	children,
}: Props) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				p: 4,
				minWidth,
				background: theme.palette.background.gradient,
				borderRadius: 2,
			}}>
			<Typography variant='h5' sx={{ mb: 3, fontFamily: 'Alegreya' }}>
				{title}
			</Typography>

			{message && (
				<Typography sx={{ mb: 2, fontSize: 18, fontWeight: 500 }}>
					{message}
				</Typography>
			)}

			{error && (
				<Typography variant='body2' color='error' mb={2}>
					{error}
				</Typography>
			)}

			<Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
				{children}
			</Box>
		</Box>
	);
};

export default ConfirmLayout;

import { Box, Typography, Button } from '@mui/material';

export const ProfileLayout = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'space-between',
				width: '100%',
				height: '100%',
				p: 3,
			}}>
			<Typography variant='h4' fontWeight={700} mb={2}>
				Header
			</Typography>
			<Typography variant='body1' mb={2}>
				Personal info
			</Typography>
			<Box sx={{ display: 'flex', gap: 2 }}>
				<Button variant='contained' color='primary'>
					Button 1
				</Button>
				<Button variant='outlined' color='secondary'>
					Button 2
				</Button>
			</Box>
		</Box>
	);
};

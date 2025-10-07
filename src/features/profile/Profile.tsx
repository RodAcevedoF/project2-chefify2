import { Box, Typography, Button, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ProfileLayout = () => {
	const nav = useNavigate();

	const handleNavigate = (path: string) => {
		return () => nav(path);
	};

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
				gap: 5,
			}}>
			<Box sx={{ border: 1, width: '100%', p: 2 }}>
				<Typography variant='h4' fontWeight={700}>
					Profile
				</Typography>
			</Box>
			<Box>
				<CardMedia title='' image='' />
				<Typography variant='body1' mb={2}></Typography>
			</Box>
			<Box sx={{ display: 'flex', gap: 2 }}>
				<Button
					variant='contained'
					color='primary'
					onClick={handleNavigate('/recipes')}>
					Button 1
				</Button>
				<Button variant='outlined' color='secondary'>
					Button 2
				</Button>
			</Box>
		</Box>
	);
};

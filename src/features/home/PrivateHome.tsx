import React from 'react';
import {
	Box,
	CardMedia,
	Container,
	Paper,
	Stack,
	Typography,
	useTheme,
	type SxProps,
} from '@mui/material';
import TipOfTheDay from './components/privateComponents/TipOfTheDay';
import RecipeOfTheDay from './components/privateComponents/RecipeOfTheDay';
import PrivateHomeHeader from './components/privateComponents/PrivateHomeHeader';
import PrivateHomeActions from './components/privateComponents/PrivateHomeActions';
import { useNavigate } from 'react-router-dom';
import { useGetUser } from '../profile/hooks/useUser';
import { homeStyles } from './home.theme';

export const PrivateHome: React.FC = () => {
	const { data } = useGetUser();
	const navigate = useNavigate();
	const t = useTheme();
	const hs = homeStyles(t);

	return (
		<Container maxWidth='lg' sx={{ mt: 6, mb: 6 }}>
			<Stack
				direction={{ sm: 'column', md: 'row' }}
				sx={{
					...hs.privateStack,
				}}>
				<CardMedia
					component='img'
					src={'/priv-home/priv-home.webp'}
					alt='Welcome Image'
					sx={{
						...hs.privateMediaCard,
					}}
				/>
				<Paper sx={hs.firstPrivPaper as SxProps} elevation={5}>
					<Box sx={{ ...hs.firstprivBox }}>
						<Box>
							<PrivateHomeHeader name={data?.name} />
							<Typography variant='body1' sx={{ mb: 2, fontSize: 18 }}>
								We are happy to have you here, chef! — here you got quick access
								to your recipes and profile, and some useful tips to get the
								most out of Chefify.
							</Typography>
						</Box>
					</Box>
					<PrivateHomeActions onNavigate={(to: string) => navigate(to)} />
				</Paper>
			</Stack>
			<Paper sx={hs.secondPrivPaper as SxProps}>
				<RecipeOfTheDay bg={t.palette.boxColors.secondary} />

				<TipOfTheDay bg={t.palette.boxColors.main} />
			</Paper>
		</Container>
	);
};

export default PrivateHome;

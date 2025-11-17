import React from 'react';
import {
	Box,
	CardMedia,
	Container,
	Paper,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import TipOfTheDay from './components/TipOfTheDay';
import RecipeOfTheDay from './components/RecipeOfTheDay';
import { useNavigate } from 'react-router-dom';
import { useGetUser } from '../profile/hooks/useUser';
import { ButtonUsage } from '../common/components/buttons/MainButton';
import { ButtonVariants } from '@/types/common.types';
import { CookingPot, ThumbsUp, UserRoundPen } from 'lucide-react';

export const PrivateHome: React.FC = () => {
	const { data } = useGetUser();
	const navigate = useNavigate();
	const t = useTheme();

	return (
		<Container maxWidth='lg' sx={{ mt: 6, mb: 6 }}>
			<Paper sx={{ p: 4, borderRadius: 3 }} elevation={5}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 3,
						mb: 2,
						flexWrap: { xs: 'wrap', sm: 'nowrap' },
					}}>
					<CardMedia
						component='img'
						src={'/priv-home.png'}
						alt='Welcome Image'
						sx={{
							width: { xs: '220px', sm: '250px', md: '300px' },
							borderRadius: 2,
						}}
					/>
					<Box>
						<Stack direction={'row'} alignItems='center' spacing={1} mb={4}>
							<Typography variant='h4' gutterBottom fontFamily={'Alegreya'}>
								Welcome back{data?.name ? `, ${data.name}` : ''}!
							</Typography>
							<ThumbsUp color={t.palette.primary.main} width={30} height={30} />
						</Stack>
						<Typography variant='body1' sx={{ mb: 2, fontSize: 18 }}>
							Here's your personalized dashboard — quick access to your recipes
							and profile, and a summary of your recent activity.
						</Typography>
					</Box>
				</Box>

				<Box
					sx={{
						display: 'flex',
						justifyContent: { xs: 'center', sm: 'flex-start' },
						alignItems: 'center',
						gap: 2,
						mt: 3,
						flexWrap: 'wrap',
					}}>
					<ButtonUsage
						label='Recipes'
						parentMethod={() => navigate('/recipes')}
						variant={ButtonVariants.DEFAULT}
						icon={CookingPot}
					/>
					<ButtonUsage
						label='Profile'
						parentMethod={() => navigate('/profile')}
						variant={ButtonVariants.DEFAULT}
						icon={UserRoundPen}
					/>
				</Box>
			</Paper>
			<Paper
				sx={{
					display: 'flex',
					gap: 2,
					mt: 3,
					flexDirection: { xs: 'column', md: 'row' },
					background: 'transparent',
					boxShadow: 'none',
				}}>
				<Box sx={{ width: { xs: '100%', md: '33%' } }}>
					<TipOfTheDay />
				</Box>
				<Box sx={{ width: { xs: '100%', md: '67%' } }}>
					<RecipeOfTheDay />
				</Box>
			</Paper>
		</Container>
	);
};

export default PrivateHome;

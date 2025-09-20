import LandingCard from '@/features/home/components/cards/LandingCard';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { useScrollContext } from '@/contexts/scrollContext/scroll.context';
import { Box, Typography, Container, useTheme } from '@mui/material';
import { homeStyles } from './home-theme';

export const Home = () => {
	const { scrolled } = useScrollContext();
	const { openModal } = useModalContext();
	const theme = useTheme();
	const hs = homeStyles(theme, scrolled);

	return (
		<Container maxWidth={false}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center',
					mt: 10,
					mb: 5,
					minHeight: '60vh',
				}}>
				<Typography sx={hs.mainTypo}>CHEFIFY</Typography>
				<Box
					sx={{
						position: 'absolute',
						left: '50%',
						top: '57%',
						transform: 'translate(-50%, -50%)',
						zIndex: -10,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						height: '100%',
						pointerEvents: 'none',
					}}>
					<img
						src='/jolly.png'
						alt='Chef Cooking'
						style={{ width: '100%', maxWidth: 600 }}
					/>
				</Box>

				<Box sx={{ visibility: scrolled ? 'visible' : 'hidden', mt: 40 }}>
					<Typography
						variant='body1'
						fontSize={50}
						fontWeight={'bolder'}
						color={scrolled ? 'primary.dark' : 'primary.main'}
						sx={{
							width: '100%',
							textAlign: 'center',
							fontSize: { md: '3rem', xs: '2rem' },
						}}>
						Your culinary journey starts here.
					</Typography>

					<Typography
						variant='body1'
						fontSize={30}
						color={scrolled ? 'primary.dark' : 'primary.main'}
						onClick={() => openModal('auth')}
						sx={{
							cursor: 'pointer',
							width: '100%',
							textAlign: 'center',
							transition: 'transform 0.3s, font-weight 0.3s',
							'&:hover': { transform: 'scale(1.05)', fontWeight: 'bolder' },
						}}>
						Please log in or register to continue.
					</Typography>
				</Box>
			</Box>
			<Box
				component='section'
				width='100%'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					paddingY: 10,
					paddingX: { xs: 2, md: 5 },
					gap: 15,
					borderRadius: 3,
					marginY: 5,
					backgroundColor: theme.palette.secondary.light,
					visibility: scrolled ? 'visible' : 'hidden',
				}}>
				<LandingCard />
				<LandingCard reverse />
				<LandingCard />
			</Box>
		</Container>
	);
};

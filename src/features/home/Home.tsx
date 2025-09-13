import LandingCard from '@/features/home/components/cards/LandingCard';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { useScrollContext } from '@/contexts/scrollContext/scroll.context';
import { Box, Typography, Container } from '@mui/material';

export const Home = () => {
	const { scrolled } = useScrollContext();
	const { openModal } = useModalContext();
	return (
		<Container
			maxWidth={false}
			sx={{
				marginLeft: 1,
				paddingTop: 10,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-end',
				justifyContent: 'center',
				gap: 20,
			}}>
			<Box sx={{ textAlign: 'center', width: '100%' }}>
				<Typography
					variant='h1'
					fontWeight='bolder'
					fontSize={280}
					zIndex={100}
					mt={10}
					flex={1}
					color={scrolled ? 'primary.light' : 'primary.main'}>
					CHEFIFY
				</Typography>
				<Box
					sx={{
						position: 'absolute',
						left: '50%',
						top: '50%',
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

				<Typography
					variant='body1'
					fontSize={50}
					mt={10}
					color={scrolled ? 'primary.light' : 'primary.main'}>
					Your culinary journey starts here.
				</Typography>

				<Typography
					variant='body1'
					fontSize={30}
					color={scrolled ? 'primary.light' : 'primary.main'}
					onClick={() => openModal('auth')}
					sx={{ cursor: 'pointer' }}>
					Please log in or register to continue.
				</Typography>
			</Box>
			<Box
				component='section'
				width='100%'
				my={4}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					padding: 10,
					gap: 10,
				}}>
				<LandingCard />
				<LandingCard reverse />
				<LandingCard />
			</Box>
		</Container>
	);
};

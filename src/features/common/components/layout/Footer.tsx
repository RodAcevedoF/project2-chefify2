import { Card, CardMedia, Container, Typography, Box } from '@mui/material';
import { ButtonUsage } from '../buttons/MainButton';
import { Send } from 'lucide-react';
import { useModalContext } from '@/contexts/modalContext/modal.context';

export const Footer = () => {
	const { openModal } = useModalContext();
	return (
		<Container
			component='footer'
			maxWidth={false}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				justifyContent: 'center',
				alignItems: 'center',
				bgcolor: 'background.paper',
				py: 5,
				gap: 5,
				px: 2,
			}}>
			<Card
				sx={{
					display: 'flex',
					width: '100%',
					p: 5,
					boxShadow: 'none',
					justifyContent: { md: 'space-between', xs: 'center' },
					alignItems: 'center',
					flexWrap: 'wrap',
					gap: { xs: 5, md: 0 },
				}}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 2,
						p: 0,
						width: { md: '440px', xs: '100%' },
					}}>
					<CardMedia
						component='img'
						image='/footerlogo.png'
						alt='Chef logo'
						sx={{ width: { md: '400px', xs: '250px' } }}
					/>
					<Typography
						sx={{
							fontSize: { xs: '1.1rem', md: '1.3rem', lg: '1.5rem' },
							fontWeight: 'bold',
							textAlign: 'center',
							fontFamily: 'Alegreya',
						}}>
						Follow flavors. Share creativity. Chefify it.
					</Typography>
				</Box>
				<ButtonUsage
					label='contact'
					extraSx={{
						width: { xs: '180px', md: '250px' },
						fontSize: { xs: '20px', md: '25px' },
						justifyContent: 'center',
					}}
					icon={Send}
					parentMethod={() => openModal('contact')}
				/>
			</Card>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					border: 3,
					p: 1,
					borderRadius: 2,
					gap: 1,
					borderColor: 'primary.contrastText',
					width: '100%',
				}}>
				<Typography
					sx={{
						fontSize: { xs: '0.8rem', md: '1rem' },
						fontWeight: 'bold',
						textAlign: 'center',
						width: 'fit-content',
					}}>
					© 2025 Chefify. Made with
				</Typography>
				<CardMedia
					component='img'
					image='/footerheart.png'
					alt='heart icon'
					sx={{ width: '60px', mx: 1, mb: 0, mt: -0.5 }}
				/>
				<Typography
					sx={{
						fontSize: { xs: '0.8rem', md: '1rem' },
						fontWeight: 'bold',
						textAlign: 'center',
						width: 'fit-content',
					}}>
					for passionate cooks.
				</Typography>
			</Box>
		</Container>
	);
};

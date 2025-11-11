import { Card, CardMedia, Container, Typography, Box } from '@mui/material';
import { ButtonUsage } from '../buttons/MainButton';
import { Send } from 'lucide-react';

export const Footer = () => {
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
			}}>
			<Card
				sx={{
					display: 'flex',
					width: '100%',
					px: 5,
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
						sx={{ width: { md: '400px', xs: '300px' } }}
					/>
					<Typography
						sx={{
							fontSize: { xs: '1.1rem', md: '1.3rem', lg: '1.5rem' },
							fontWeight: 'bold',
							textAlign: 'center',
							fontFamily: 'Alegreya',
						}}>
						Partner with a creative agency that's ambitious as you are.
					</Typography>
				</Box>
				<ButtonUsage
					label='contact'
					extraSx={{
						width: '250px',
						fontSize: '25px',
						justifyContent: 'center',
					}}
					icon={Send}
				/>
			</Card>
			<Typography
				sx={{
					fontSize: '1rem',
					fontWeight: 'bold',
					textAlign: 'center',
					width: '100%',
					border: 1,
					py: 1,
					borderRadius: 2,
				}}>
				© 2025 Chefify. Made with ❤️ for passionate cooks.
			</Typography>
		</Container>
	);
};

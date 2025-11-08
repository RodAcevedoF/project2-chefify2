import { Box, Typography, useTheme } from '@mui/material';
import { ChefHat, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ButtonUsage } from '../common/components/buttons/MainButton';
import { ButtonIconPositions, ButtonVariants } from '@/types/common.types';

export const NotFound = () => {
	const theme = useTheme();
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate('/recipes');
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<Box
			sx={{
				minHeight: '80vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				background: theme.palette.background.gradient,
				textAlign: 'center',
				px: 3,
			}}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					maxWidth: 500,
				}}>
				<ChefHat
					size={120}
					color={theme.palette.primary.main}
					style={{ filter: 'drop-shadow(15px 5px 5px rgba(0, 0, 0, 0.3))' }}
				/>

				<Typography
					variant='h2'
					sx={{
						fontSize: { xs: '8rem', sm: '10rem' },
						fontWeight: 'bold',
						color: theme.palette.primary.main,
						fontFamily: 'Alegreya',
						textShadow: '15px 5px 5px rgba(0, 0, 0, 0.3)',
					}}>
					404
				</Typography>
				<Typography
					variant='h4'
					sx={{
						fontFamily: 'Alegreya',
						color: theme.palette.text.primary,
						fontWeight: 600,
						mb: 1,
					}}>
					Recipe Not Found
				</Typography>

				<Typography
					sx={{
						color: theme.palette.text.secondary,
						maxWidth: 500,
						lineHeight: 2,
						fontSize: '18px',
					}}>
					Oops! It looks like this recipe has been moved or doesn't exist. Let's
					get you back to cooking something delicious!
				</Typography>

				<Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
					<ButtonUsage
						label='Browse Recipes'
						parentMethod={handleGoHome}
						icon={ChefHat}
						variant={ButtonVariants.LIGHT}
						iconPos={ButtonIconPositions.START}
					/>
					<ButtonUsage
						label='Go Back'
						parentMethod={handleGoBack}
						icon={ArrowLeft}
						variant={ButtonVariants.OUTLINED}
						iconPos={ButtonIconPositions.START}
					/>
				</Box>
			</Box>
		</Box>
	);
};

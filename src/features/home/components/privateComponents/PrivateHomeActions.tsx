import React from 'react';
import { Box, CardMedia } from '@mui/material';
import { CookingPot, UserRoundPen } from 'lucide-react';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { ButtonVariants } from '@/types/common.types';

type Props = {
	onNavigate: (to: string) => void;
};

const PrivateHomeActions: React.FC<Props> = ({ onNavigate }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				gap: 2,
				alignItems: 'center',
				justifyContent: 'center',
			}}>
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
					parentMethod={() => onNavigate('/recipes')}
					variant={ButtonVariants.DEFAULT}
					icon={CookingPot}
				/>
				<ButtonUsage
					label='Profile'
					parentMethod={() => onNavigate('/profile')}
					variant={ButtonVariants.DEFAULT}
					icon={UserRoundPen}
				/>
			</Box>

			<CardMedia
				component='img'
				src={'/priv-home/home-tomato.webp'}
				alt='Welcome Image'
				sx={{ width: '80px', borderRadius: 8 }}
			/>
		</Box>
	);
};

export default PrivateHomeActions;

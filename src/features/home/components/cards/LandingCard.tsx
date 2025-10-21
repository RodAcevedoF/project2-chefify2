import { Card, CardMedia, Box, Typography, useTheme } from '@mui/material';
import { homeStyles } from '../../home.theme';
import { ButtonUsage } from '@/features/common/components/ui/buttons/MainButton';
import { ArrowRight } from 'lucide-react';

export type LandingCardProps = {
	reverse?: boolean;
	mediaContainer?: string;
};

const LandingCard = (props: LandingCardProps) => {
	const theme = useTheme();
	const styles = homeStyles(theme);

	return (
		<Card
			sx={{
				...styles.landingCard,
				flexDirection: props.reverse ? 'row-reverse' : 'row',
			}}>
			<Box sx={{ maxWidth: 500, width: '40%', minWidth: 220 }}>
				<Typography sx={{ ...styles.landingCard.typography }}>
					Juice is where strategy, design, and technology come together to build
					brands people believe in — and empower them to grow with purpose.
				</Typography>
				<ButtonUsage
					extraSx={{ ...styles.landingBtn }}
					icon={ArrowRight}
					label='Get Started'
					iconSx={{ width: 20 }}
				/>
			</Box>
			<CardMedia
				component='img'
				image='/cook.webp'
				alt='Chef cocinando'
				sx={{ ...styles.landingCard.cardMedia }}
			/>
		</Card>
	);
};

export default LandingCard;

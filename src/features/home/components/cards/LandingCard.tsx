import { Card, CardMedia, Typography, useTheme } from '@mui/material';
import { homeStyles } from '../../home-theme';

export type LandingCardProps = {
	reverse?: boolean;
};

const LandingCard = ({ reverse = false }: LandingCardProps) => {
	const theme = useTheme();
	const styles = homeStyles(theme);

	return (
		<Card
			sx={{
				...styles.landingCard,
				flexDirection: reverse ? 'row-reverse' : 'row',
			}}>
			<CardMedia
				component='img'
				image='/cook.webp'
				alt='Chef cocinando'
				sx={{ ...styles.landingCard.cardMedia }}
			/>
			<Typography sx={{ color: 'black' }}>Example</Typography>
		</Card>
	);
};

export default LandingCard;

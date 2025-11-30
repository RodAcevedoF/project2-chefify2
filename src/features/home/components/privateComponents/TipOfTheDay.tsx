import { type FC, useMemo } from 'react';
import { Box, CardMedia, Paper, Typography } from '@mui/material';
import { TIPS } from './data/constants';

type TipProps = {
	bg?: string;
};

const TipOfTheDay: FC<TipProps> = ({ bg }) => {
	const tip = useMemo(() => TIPS[Math.floor(Math.random() * TIPS.length)], []);
	return (
		<Paper
			sx={{
				p: 2,
				borderRadius: 8,
				backgroundColor: bg,
				height: '100%',
				width: { xs: '100%', md: '40%' },
				position: 'relative',
			}}
			elevation={5}>
			<Typography variant='h3' gutterBottom fontFamily={'Alegreya'}>
				Tip of the day
			</Typography>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-end',
					flexWrap: { xs: 'wrap', lg: 'nowrap' },
					width: '100%',
					height: '100%',
				}}>
				<Typography fontSize={'18px'}>{tip}</Typography>
				<CardMedia
					component='img'
					src={'/priv-home/day_tip.webp'}
					alt='Tip of the day illustration'
					sx={{
						mt: 2,
						borderRadius: 2,
						width: '120px',
					}}
				/>
			</Box>
		</Paper>
	);
};

export default TipOfTheDay;

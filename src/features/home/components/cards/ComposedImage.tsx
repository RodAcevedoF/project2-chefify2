import { Box, CardMedia } from '@mui/material';
import { keyframes } from '@emotion/react';

type Props = {
	maxWidth?: number | string;
	alt?: string;
};

const ComposedImage = ({ maxWidth = 750, alt = 'Composed Image' }: Props) => {
	const floatUp = keyframes`
		from { opacity: 0; transform: translateY(12px) scale(0.98); }
		to { opacity: 1; transform: translateY(0) scale(1); }
	`;

	const slideInLeft = keyframes`
		from { opacity: 0; transform: translateX(-18px) rotate(-6deg); }
		to { opacity: 1; transform: translateX(0) rotate(0deg); }
	`;

	const slideInRight = keyframes`
		from { opacity: 0; transform: translateX(18px) rotate(6deg); }
		to { opacity: 1; transform: translateX(0) rotate(0deg); }
	`;

	const popUp = keyframes`
		from { opacity: 0; transform: translateY(18px) scale(0.96); }
		60% { transform: translateY(-6px) scale(1.02); }
		to { opacity: 1; transform: translateY(0) scale(1); }
	`;

	return (
		<Box
			sx={{
				width: '100%',
				maxWidth,
				mx: 'auto',
				display: 'flex',
				flexWrap: 'wrap',
				gap: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Box
				sx={{
					position: 'relative',
					width: '100%',
					maxWidth,
					display: 'flex',
					justifyContent: 'center',
				}}>
				<CardMedia
					component='img'
					image='/jolly/circle.webp'
					alt={alt}
					sx={{
						width: '100%',
						maxWidth,
						pointerEvents: 'none',
						display: 'block',
						zIndex: 1,
						animation: `${floatUp} 560ms cubic-bezier(.2,.9,.2,1) both`,
						'@media (prefers-reduced-motion: reduce)': { animation: 'none' },
					}}
				/>

				<CardMedia
					component='img'
					image='/jolly/fire_r.webp'
					alt='flame right'
					sx={{
						width: '18%',
						maxWidth: 100,
						pointerEvents: 'none',
						position: 'absolute',
						top: '62%',
						right: '11%',
						transform: 'translateY(-50%)',
						zIndex: 2,
						animation: `${slideInRight} 640ms cubic-bezier(.2,.9,.2,1) 80ms both`,
						'@media (prefers-reduced-motion: reduce)': { animation: 'none' },
					}}
				/>

				<CardMedia
					component='img'
					image='/jolly/fire_l.webp'
					alt='flame left'
					sx={{
						width: '18%',
						maxWidth: 110,
						pointerEvents: 'none',
						position: 'absolute',
						top: '62%',
						left: '10%',
						transform: 'translateY(-50%)',
						zIndex: 2,
						animation: `${slideInLeft} 640ms cubic-bezier(.2,.9,.2,1) 120ms both`,
						'@media (prefers-reduced-motion: reduce)': { animation: 'none' },
					}}
				/>
				<CardMedia
					component='img'
					image='/jolly/hat.webp'
					alt='chef hat'
					sx={{
						width: '70%',
						maxWidth: 550,
						pointerEvents: 'none',
						position: 'absolute',
						left: '15%',
						zIndex: 3,
						top: '2%',
						animation: `${popUp} 560ms cubic-bezier(.2,.9,.2,1) 200ms both`,
						'@media (prefers-reduced-motion: reduce)': { animation: 'none' },
					}}
				/>
				<CardMedia
					component='img'
					image='/jolly/rollingpin.webp'
					alt='rolling pin'
					sx={{
						width: '50%',
						maxWidth: 450,
						pointerEvents: 'none',
						position: 'absolute',
						bottom: '13%',
						left: '35%',
						animation: `${popUp} 560ms cubic-bezier(.2,.9,.2,1) 260ms both`,
						'@media (prefers-reduced-motion: reduce)': { animation: 'none' },
					}}
				/>
				<CardMedia
					component='img'
					image='/jolly/spatula.webp'
					alt='spatula'
					sx={{
						width: '50%',
						maxWidth: 450,
						pointerEvents: 'none',
						position: 'absolute',
						bottom: '12%',
						right: '35%',
						animation: `${popUp} 560ms cubic-bezier(.2,.9,.2,1) 320ms both`,
						'@media (prefers-reduced-motion: reduce)': { animation: 'none' },
					}}
				/>
			</Box>
		</Box>
	);
};

export default ComposedImage;

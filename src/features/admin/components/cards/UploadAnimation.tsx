import { Box } from '@mui/material';

const UploadAnimation = () => {
	return (
		<Box
			sx={{
				position: 'relative',
				width: '160px',
				height: '160px',
				'& img': {
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: 'auto',
					opacity: 0,
					animation: 'flipbook 1.6s steps(1) infinite',
				},
				'& img:nth-of-type(1)': {
					animationDelay: '0s',
				},
				'& img:nth-of-type(2)': {
					animationDelay: '0.4s',
				},
				'& img:nth-of-type(3)': {
					animationDelay: '0.8s',
				},
				'& img:nth-of-type(4)': {
					animationDelay: '1.2s',
				},
				'@keyframes flipbook': {
					'0%, 25%': {
						opacity: 1,
					},
					'25.01%, 100%': {
						opacity: 0,
					},
				},
			}}>
			<img src='/anim/anim1.webp' alt='Upload Animation Frame 1' />
			<img src='/anim/anim2.webp' alt='Upload Animation Frame 2' />
			<img src='/anim/anim3.webp' alt='Upload Animation Frame 3' />
			<img src='/anim/anim4.webp' alt='Upload Animation Frame 4' />
		</Box>
	);
};

export default UploadAnimation;

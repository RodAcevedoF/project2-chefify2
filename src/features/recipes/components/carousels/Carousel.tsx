import { Box, CardMedia } from '@mui/material';
import { useEffect, useState } from 'react';

export const Carousel = () => {
	const images = ['/carousel1.jpg', '/carousel2.jpg', '/carousel3.jpg'];
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const [visible, setVisible] = useState<boolean>(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setVisible(false);
			setTimeout(() => {
				setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
				setVisible(true);
			}, 400);
		}, 3000);
		return () => clearInterval(interval);
	}, [images.length]);

	return (
		<Box>
			<CardMedia
				component={'img'}
				image={images[selectedIndex]}
				alt='carousel'
				sx={{
					minWidth: 250,
					maxWidth: 600,
					borderRadius: 10,
					opacity: visible ? 1 : 0,
					transition: 'opacity 0.4s ease',
				}}
			/>
		</Box>
	);
};

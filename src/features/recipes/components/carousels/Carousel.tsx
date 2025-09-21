import { Box, CardMedia } from '@mui/material';
import { useEffect, useState } from 'react';

export const Carousel = () => {
	const images = ['/carousel1.jpg', '/carousel2.jpg', '/carousel3.jpg'];
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
		}, 3000);

		return () => clearInterval(interval);
	}, [images.length]);
	return (
		<Box>
			<CardMedia
				component={'img'}
				image={images[selectedIndex]}
				alt='carousel'
				style={{ minWidth: 250, maxWidth: 550, borderRadius: 10 }}
			/>
		</Box>
	);
};

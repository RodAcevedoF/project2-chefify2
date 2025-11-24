import { useMemo, type FC } from 'react';
import { Box, type SxProps, type Theme } from '@mui/material';

type OldAnimationProps = {
	images: string[];
	frameDuration?: number;
	size?: number | string;
	sx?: SxProps<Theme>;
};

const OldAnimation: FC<OldAnimationProps> = ({
	images,
	frameDuration = 0.4,
	size = 180,
	sx,
}) => {
	const count = Math.max(0, images?.length || 0);

	const animName = useMemo(
		() => `flipbook_${count}_${Math.floor(Math.random() * 1e6)}`,
		[count],
	);

	const totalDuration = +(frameDuration * Math.max(1, count)).toFixed(3);

	const chunk = count > 0 ? 100 / count : 100;
	const visibleEnd = +chunk.toFixed(3);
	const hiddenStart = +(chunk + 0.01).toFixed(3);

	const baseSx: SxProps<Theme> = {
		position: 'relative',
		width: typeof size === 'number' ? `${size}px` : size,
		height: typeof size === 'number' ? `${size}px` : size,
		'& img': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			objectFit: 'cover',
			opacity: 0,
			animation: `${animName} ${totalDuration}s steps(1) infinite`,
		},
		...images?.reduce<Record<string, unknown>>((acc, _, i) => {
			acc[`& img:nth-of-type(${i + 1})`] = {
				animationDelay: `${(i * frameDuration).toFixed(3)}s`,
			} as unknown;
			return acc;
		}, {}),
	};

	(baseSx as Record<string, unknown>)[`@keyframes ${animName}`] = {
		['0%']: { opacity: 1 },
		[`${visibleEnd}%`]: { opacity: 1 },
		[`${hiddenStart}%`]: { opacity: 0 },
		['100%']: { opacity: 0 },
	};

	const mergedSx = Array.isArray(sx) ? [baseSx, ...sx] : [baseSx, sx];

	return (
		<Box sx={mergedSx} aria-hidden>
			{images.map((src, i) => (
				<img key={i} src={src} alt={`Upload animation frame ${i + 1}`} />
			))}
		</Box>
	);
};

export default OldAnimation;

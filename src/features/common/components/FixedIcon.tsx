import React from 'react';
import { Box, type SxProps, type Theme } from '@mui/material';

type Props = {
	icon: React.ElementType;
	size?: number;
	color?: string;
	boxSize?: number;
	sx?: SxProps<Theme>;
};

const FixedIcon: React.FC<Props> = ({
	icon: Icon,
	size = 20,
	color,
	boxSize,
	sx,
}) => {
	const finalBox = boxSize ?? size;

	const baseSx: SxProps<Theme> = {
		width: finalBox,
		height: finalBox,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
	};

	const mergedSx: SxProps<Theme> = Array.isArray(sx)
		? ([baseSx, ...sx] as SxProps<Theme>)
		: ([baseSx, sx] as SxProps<Theme>);

	return (
		<Box sx={mergedSx}>
			<Icon size={size} color={color} />
		</Box>
	);
};

export default FixedIcon;

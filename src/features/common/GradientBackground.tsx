import React from 'react';
import { useTheme } from '@mui/material/styles';

type Props = {
	mode: 'default' | 'light';
};

export const GradientBackground: React.FC<Props> = ({ mode }) => {
	const theme = useTheme();

	const defaultGradient = theme.palette.background?.gradient ?? '';
	const lightGradient =
		theme.palette.background?.lightGradient ?? defaultGradient;

	const baseStyle: React.CSSProperties = {
		position: 'fixed',
		inset: 0,
		pointerEvents: 'none',
		zIndex: -10,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		transition: 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out',
	};

	return (
		<>
			<div
				aria-hidden
				style={{
					...baseStyle,
					background: defaultGradient,
					opacity: mode === 'default' ? 1 : 0,
				}}
			/>

			<div
				aria-hidden
				style={{
					...baseStyle,
					background: lightGradient,
					opacity: mode === 'light' ? 1 : 0,
					zIndex: -9,
				}}
			/>
		</>
	);
};

export default GradientBackground;

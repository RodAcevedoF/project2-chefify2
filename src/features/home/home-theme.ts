import type { Theme } from '@mui/material/styles';

export const homeStyles = (theme: Theme) => ({
	landingCard: {
		backgroundColor: theme.palette.secondary.light,
		p: 10,
		display: 'flex',
		justifyContent: 'space-around',
		gap: 2,
		typography: {
			color: theme.palette.primary.dark,
		},
		cardMedia: {
			width: '40%',
			height: 'auto',
			borderRadius: 3,
		},
	},
});

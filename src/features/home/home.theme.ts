import type { Theme } from '@mui/material/styles';

export const homeStyles = (theme: Theme, scrolled: boolean = false) => ({
	landingCard: {
		backgroundColor: theme.palette.secondary.light,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 6,
		borderRadius: 3,
		boxShadow: 'none',
		flexWrap: 'wrap',
		typography: {
			color: theme.palette.primary.dark,
			fontSize: '1.5rem',
			[theme.breakpoints.down('sm')]: {
				fontSize: '1rem',
			},
		},
		cardMedia: {
			width: '40%',
			maxWidth: 500,
			minWidth: 220,
			height: 'auto',
			borderRadius: 3,
		},
	},
	mainTypo: {
		variant: 'h1',
		fontWeight: 'bolder',
		fontSize: { md: '20vw', xs: '22vw' },
		fontFamily: 'Alegreya',
		textShadow: '5px 8px 12px rgba(0, 0, 0, 0.66)',
		zIndex: 100,
		color: scrolled ? theme.palette.primary.dark : theme.palette.primary.main,
		borderRadius: 2,
		width: '100%',
		textAlign: 'center',
		border: 4,
		borderColor: theme.palette.primary.light,
	},
	landingBtn: {
		backgroundColor: 'inherit',
		background: 'inherit',
		color: theme.palette.primary.dark,
		border: 'none',
		fontWeight: 'bold',
		fontSize: '1rem',
		borderRadius: 0,
		borderBottom: 1,
		'&:hover': {
			borderColor: theme.palette.background.default,
		},
		mt: 4,
	},
});

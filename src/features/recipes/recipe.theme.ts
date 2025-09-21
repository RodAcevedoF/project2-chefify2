import type { Theme } from '@mui/material/styles';

export const recipeStyles = (theme: Theme) => ({
	recipeAside: {
		display: 'flex',
		width: 'fit-content',
		justifyContent: 'center',
		alignItems: 'flex-start',
		minHeight: '100vh',
		backgroundColor: theme.palette.secondary.light,
		paddingTop: 5,
		boxShadow: 'inset 0 20px 40px rgba(0, 0, 0, 0.51)',
	},
	boxContent: {
		width: 200,
		p: 2,
	},
	title: {
		fontSize: '1.5rem',
		mb: 2,
		fontWeight: 'bolder',
		color: theme.palette.background.paper,
		display: 'flex',
		alignItems: 'center',
		gap: 1,
	},
});

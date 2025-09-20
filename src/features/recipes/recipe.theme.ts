import type { Theme } from '@mui/material/styles';

export const recipeStyles = (theme: Theme) => ({
	recipeAside: {
		display: 'flex',
		width: 'fit-content',
		justifyContent: 'center',
		alignItems: 'flex-start',
		minHeight: '80vh',
		backgroundColor: theme.palette.secondary.light,
		paddingTop: 5,
	},
	boxContent: {
		width: 200,
		p: 2,
		height: '100%',
	},
	title: {
		fontSize: '1.5rem',
		mb: 2,
		fontWeight: 'bolder',
		color: theme.palette.background.paper,
	},
});

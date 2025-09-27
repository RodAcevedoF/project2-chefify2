import type { Theme } from '@mui/material/styles';

export const recipeFormStyles = (theme: Theme) => ({
	recipeFormBox: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: { xs: '85vw', sm: '500px' },
		minWidth: '200px',
		height: 'fit-content',
		borderRadius: 2,
		boxShadow: 3,
		p: 2,
		bgcolor: 'background.default',
		box: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			mb: 2,
		},
		typo: {
			fontSize: '1.5rem',
			fontWeight: 700,
		},
	},
	form: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '80%',
		gap: 2,
		flexWrap: 'wrap',
		box: {
			display: 'flex',
			gap: 2,
			alignItems: 'center',
			flexWrap: 'wrap',
			justifyContent: 'space-between',
			inBox: {
				position: 'relative',
				width: { sm: '45%', xs: '100%' },
			},
			typo: {
				position: 'absolute',
				right: 10,
				top: '50%',
				transform: 'translateY(-50%)',
				pointerEvents: 'none',
				color: theme.palette.primary.main,
			},
		},
	},
	createBtnBox: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 1,
		mt: 3,
		width: '80%',
	},
});

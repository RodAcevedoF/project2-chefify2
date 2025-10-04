import type { Theme } from '@mui/material/styles';
import type { CategoriesInputProps } from './components/categories-input';

export const recipeFormStyles = (
	theme: Theme,
	props: Partial<CategoriesInputProps>,
) => ({
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
		width: '80%',
	},
	categoriesInput: {
		form: {
			height: '40px',
			width: '100%',
		},
		select: {
			textAlign: 'left',
			borderColor: props.color,
			color: props.color,
			'& .MuiOutlinedInput-notchedOutline': {
				borderColor: props.color,
			},
			'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
				borderColor: props.color,
			},
			'&:hover .MuiOutlinedInput-notchedOutline': {
				borderColor: props.color,
			},
			'& .MuiSvgIcon-root': {
				color: props.color,
			},
			'& .MuiInputLabel-root': {
				color: props.color,
			},
			height: '40px',
			width: '100%',
			minWidth: 130,
		},
		menuItem: {
			'&:focus, &.Mui-focusVisible': {
				bgcolor: 'rgba(25,118,210,0.12)',
			},
			'&:hover': { bgcolor: 'rgba(57, 140, 94, 0.25)' },
			'&.Mui-selected': { bgcolor: 'rgba(25,118,210,0.16)' },
			borderRadius: 1,
		},
		inputLabel: {
			color: props.color,
			p: 0,
			position: 'absolute',
			top: '-7px',
		},
	},
});

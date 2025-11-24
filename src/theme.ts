import { createTheme, type ThemeOptions } from '@mui/material/styles';

const CIRCLE_GRADIENT = 'radial-gradient(circle, #5ea87e86 0%, #4c8a6882 100%)';
const LIGHT_CIRCLE_GRADIENT =
	'radial-gradient(circle, #ffffeb 0%, #e0e0cdff 100%)';

const themeOptions: ThemeOptions = {
	palette: {
		primary: {
			main: '#ffffeb',
			contrastText: '#ffffeb1b',
			dark: '#232524',
			light: '#ffffeb7f',
		},
		success: {
			main: '#5555f7fd',
			light: '#d6d326d5',
			dark: '#03302eff',
			selected: '#13826aec',
		},
		secondary: {
			main: '#f500149d',
			light: '#E7D2B0',
		},
		background: {
			default: '#5ea894c3',
			gradient: CIRCLE_GRADIENT,
			lightGradient: LIGHT_CIRCLE_GRADIENT,
			paper: '#212825e3',
			semitransparent: '#e7d2b0ba',
			chartLikes: '#c025b1f7',
		},
		divider: '#5ea89d75',
		boxColors: {
			main: '#f5bb649f',
			light: '#7fb77fb6',
			dark: '#3b6f3b',
			primary: '#ffffeb',
			secondary: '#c025b367',
			tertiary: '#8ac0e1a2',
		},
		borders: {
			bright: '#0ceabaff',
			transparent: '#0ceabaaa',
		},
	},
	typography: {
		fontFamily: 'Dinot',
	},
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: '#ffffeb',
						},
						'&:hover fieldset': {
							borderColor: '#ffffeb',
						},
						'&.Mui-focused fieldset': {
							borderColor: '#ffffeb',
						},
					},
					'& .MuiInputLabel-root': {
						color: '#ffffeb',
						'&.Mui-focused': {
							color: '#ffffeb',
						},
					},
					input: {
						color: '#ffffeb',
					},
				},
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					color: '#ffffeb',
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: '#5ea85e',
					color: '#ffffeb',
					boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
					backdropFilter: 'blur(12px)',
					border: '1px solid #ffffeb20',
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 6,
				},
			},
		},
	},
};

export const theme = createTheme(themeOptions);

export default theme;

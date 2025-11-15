import { createTheme, type ThemeOptions } from '@mui/material/styles';

const CIRCLE_GRADIENT = 'radial-gradient(circle, #5ea85e 0%, #4c8a4cff 100%)';
const LIGHT_CIRCLE_GRADIENT =
	'radial-gradient(circle, #ffffeb 0%, #e0e0cdff 100%)';

const themeOptions: ThemeOptions = {
	palette: {
		primary: {
			main: '#ffffeb',
			dark: '#232524',
			light: '#ffffeb7f',
		},
		success: {
			main: '#784cafff',
			light: '#d6d426ff',
			dark: '#033018',
			selected: '#0e5830ff',
		},
		secondary: {
			main: '#f500149d',
			light: '#E7D2B0',
		},
		background: {
			default: '#5ea85e',
			gradient: CIRCLE_GRADIENT,
			lightGradient: LIGHT_CIRCLE_GRADIENT,
			paper: '#232524',
			semitransparent: '#e7d2b0ba',
			chartLikes: '#ff408199',
		},
		divider: '#5ea85e75',
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

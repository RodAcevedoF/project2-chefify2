import { createTheme, type ThemeOptions } from '@mui/material';

const themeOptions: ThemeOptions = {
	palette: {
		primary: {
			main: '#ffffeb',
			dark: '#232524',
		},
		secondary: {
			main: '#f50057',
			light: '#E7D2B0',
		},
		background: {
			default: '#5ea85e',
			paper: '#232524',
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

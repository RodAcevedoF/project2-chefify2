import { Container, Typography } from '@mui/material';

export const Footer = () => {
	return (
		<Container
			component='footer'
			maxWidth={false}
			sx={{
				display: 'flex',
				width: '100%',
				justifyContent: 'center',
				alignItems: 'center',
				paddingY: 4,
				bgcolor: 'background.paper',
			}}>
			<Typography>
				© 2025 Chefify. Made with ❤️ for passionate cooks.
			</Typography>
		</Container>
	);
};

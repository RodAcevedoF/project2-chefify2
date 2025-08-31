import { Box, Container } from '@mui/material';

export const Footer = () => {
	return (
		<Container
			component='footer'
			maxWidth={false}
			sx={{
				display: 'flex',
				width: '100%',
				borderTop: 2,
				borderColor: '#38825260',
				justifyContent: 'center',
				alignItems: 'center',
				paddingY: 4,
			}}>
			<Box>
				<p>© 2025 Chefify. Made with ❤️ for passionate cooks.</p>
			</Box>
		</Container>
	);
};

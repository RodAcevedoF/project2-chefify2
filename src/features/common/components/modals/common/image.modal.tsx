import { Box, CardMedia } from '@mui/material';

type ImgModalProps = {
	imgUrl?: string;
};

export const ImgModal = (props: ImgModalProps = {}) => {
	const { imgUrl } = props;

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<CardMedia
					component='img'
					image={imgUrl || '/default-recipe.png'}
					alt={imgUrl ?? 'default image'}
					sx={{
						borderRadius: 2,
						width: { xs: '95%', sm: '70%', md: '60%', lg: '50%' },
						objectFit: 'cover',
					}}
				/>
			</Box>
		</>
	);
};

export default ImgModal;

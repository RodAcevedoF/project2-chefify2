import React from 'react';
import { Box, Paper, Typography, Button, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RecipeOfTheDay: React.FC = () => {
	const navigate = useNavigate();

	const recipe = {
		id: 'featured-1',
		title: 'Roasted Garlic & Tomato Pasta',
		description:
			'Simple, comforting pasta with roasted tomatoes, garlic and basil.',
		image:
			'https://images.unsplash.com/photo-1512058564366-c9e3f5b3e7d6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder',
	};

	return (
		<Paper sx={{ p: 0, borderRadius: 2, overflow: 'hidden' }} elevation={5}>
			<CardMedia
				component='img'
				height='140'
				image={recipe.image}
				alt={recipe.title}
			/>
			<Box sx={{ p: 2 }}>
				<Typography variant='h6'>{recipe.title}</Typography>
				<Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
					{recipe.description}
				</Typography>
				<Button
					size='small'
					variant='contained'
					onClick={() => navigate(`/recipes/${recipe.id}`)}>
					View recipe
				</Button>
			</Box>
		</Paper>
	);
};

export default RecipeOfTheDay;

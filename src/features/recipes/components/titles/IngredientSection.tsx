import type { IngredientRefDTO } from '@/types/ingredient.type';
import { List, ListItem, Typography } from '@mui/material';
import IngredientCard from '../cards/IngredientCard';

type IngredientTitleProps = {
	ingredients: IngredientRefDTO[];
};

const IngredientSection = ({ ingredients }: IngredientTitleProps) => {
	return (
		<>
			<Typography variant='h6' mt={2} sx={{ fontFamily: 'Alegreya' }}>
				Ingredients:
			</Typography>
			<List sx={{ display: 'flex', flexDirection: 'column' }}>
				{ingredients.map((ing) => (
					<ListItem key={ing._id}>
						<IngredientCard ing={ing} />
					</ListItem>
				))}
			</List>
		</>
	);
};

export default IngredientSection;

import { Box, Typography, useTheme } from '@mui/material';
import { CookingPot } from 'lucide-react';

type IngredientProp = {
	ing: {
		ingredient?: unknown;
		quantity?: unknown;
		_id?: string;
	};
};

function formatIngredientLine(ing: IngredientProp['ing']) {
	if (!ing) return '';
	const ingredientObj = ing.ingredient;
	let name = '';
	let unit = '';
	if (typeof ingredientObj === 'object' && ingredientObj !== null) {
		const obj = ingredientObj as { name?: string; unit?: string };
		name = obj.name ?? '';
		unit = obj.unit ?? '';
	} else if (typeof ingredientObj === 'string') {
		name = ingredientObj;
	}
	const qty = ing.quantity ?? '';
	return `${name}${unit ? ` - ${qty} ${unit}` : ''}`.trim();
}

export default function IngredientCard({ ing }: IngredientProp) {
	const theme = useTheme();
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
			<CookingPot color={theme.palette.primary.main} width={15} />
			<Typography variant='body1'>{formatIngredientLine(ing)}</Typography>
		</Box>
	);
}

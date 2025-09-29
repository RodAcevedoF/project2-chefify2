import {
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	Select,
	useTheme,
} from '@mui/material';
import { Controller, type Control } from 'react-hook-form';
import { recipeFormStyles } from '../recipe-form.theme';

export interface CategoriesInputProps {
	control: Control;
	id: string;
	label: string;
	categories: string[];
	color: string;
	name: string;
}

const CategoriesInput = (props: CategoriesInputProps) => {
	const theme = useTheme();
	const rs = recipeFormStyles(theme, props);

	return (
		<FormControl sx={rs.categoriesInput.form}>
			<InputLabel
				id={props.id}
				sx={{
					...rs.categoriesInput.inputLabel,
					color: rs.categoriesInput.inputLabel.color || 'inherit',
				}}>
				Categories
			</InputLabel>
			<Controller
				name={props.name}
				control={props.control}
				render={({ field }) => (
					<Select
						labelId={props.id}
						multiple
						value={field.value || []}
						onChange={(e) => field.onChange(e.target.value)}
						label={props.label}
						renderValue={(selected) => (selected as string[]).join(',')}
						sx={{
							...rs.categoriesInput.select,
							borderColor: rs.categoriesInput.select.borderColor || 'inherit',
							color: rs.categoriesInput.select.color || 'inherit',
						}}>
						{props.categories.map((cat) => (
							<MenuItem key={cat} value={cat} sx={rs.categoriesInput.menuItem}>
								<Checkbox
									checked={(
										(field.value as (typeof props.categories)[number][]) || []
									).includes(cat)}
								/>
								<ListItemText primary={cat} />
							</MenuItem>
						))}
					</Select>
				)}
			/>
		</FormControl>
	);
};

export default CategoriesInput;

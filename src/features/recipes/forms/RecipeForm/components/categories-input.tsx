import {
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	Select,
} from '@mui/material';
import { Controller, type Control } from 'react-hook-form';

export interface CategoriesInputProps {
	control: Control;
	id: string;
	label: string;
	categories: string[];
	color: string;
	name: string;
}

const CategoriesInput = (props: CategoriesInputProps) => {
	return (
		<FormControl
			sx={{
				height: '40px',
				width: '100%',
			}}>
			<InputLabel
				id={props.id}
				sx={{
					color: props.color,
					p: 0,
					position: 'absolute',
					top: '-7px',
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
							textAlign: 'left',
							borderColor: props.color,
							color: props.color,
							'& .MuiOutlinedInput-notchedOutline': {
								borderColor: props.color,
							},
							'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
								borderColor: props.color,
							},
							'&:hover .MuiOutlinedInput-notchedOutline': {
								borderColor: props.color,
							},
							'& .MuiSvgIcon-root': {
								color: props.color,
							},
							'& .MuiInputLabel-root': {
								color: props.color,
							},
							height: '40px',
							width: '100%',
							minWidth: 130,
						}}>
						{props.categories.map((cat) => (
							<MenuItem
								key={cat}
								value={cat}
								sx={{
									'&:focus, &.Mui-focusVisible': {
										bgcolor: 'rgba(25,118,210,0.12)',
									},
									'&:hover': { bgcolor: 'rgba(57, 140, 94, 0.25)' },
									'&.Mui-selected': { bgcolor: 'rgba(25,118,210,0.16)' },
									borderRadius: 1,
								}}>
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

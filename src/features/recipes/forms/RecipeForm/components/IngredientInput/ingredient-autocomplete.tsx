import { Box, IconButton, TextField, Autocomplete } from '@mui/material';
import { Plus } from 'lucide-react';
import type { Ingredient } from '@/types/ingredient.type';
import { theme } from '@/theme';

interface Props {
	options: Ingredient[];
	inputValue: string;
	setInputValue: (v: string) => void;
	onAdd: (name: string) => void;
	loading?: boolean;
	color: string;
}

export default function IngredientAutocomplete({
	options,
	inputValue,
	setInputValue,
	onAdd,
	loading,
	color,
}: Props) {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				position: 'relative',
				width: '100%',
			}}>
			<Autocomplete
				freeSolo
				options={options || []}
				sx={{ width: '100%' }}
				disableClearable
				getOptionLabel={(option) =>
					typeof option === 'object' && option !== null ? option.name || '' : ''
				}
				inputValue={inputValue || ''}
				onInputChange={(_, v) => setInputValue(v || '')}
				onChange={(_, value) => {
					if (!value) return;
					const name = typeof value === 'string' ? value : value.name;
					if (name) onAdd(name);
				}}
				loading={loading}
				noOptionsText={
					inputValue.trim().length < 2
						? 'Enter at least 2 characters'
						: 'No ingredients found'
				}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder='Add ingredient...'
						size='small'
						fullWidth
						sx={{
							minWidth: '100%',
							'& .MuiOutlinedInput-input::placeholder': { color, opacity: 1 },
							'& .MuiOutlinedInput-input': { paddingRight: '40px' },
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								const v = (e.target as HTMLInputElement).value;
								if (v?.trim()) onAdd(v.trim());
							}
						}}
					/>
				)}
				renderOption={(optionProps, option) => (
					<Box
						component='li'
						{...optionProps}
						key={option._id}
						sx={{ color: theme.palette.primary.main }}>
						{option.name}
						{option.unit && (
							<Box
								component='span'
								sx={{ ml: 1, fontSize: '0.8em', color: 'whitesmoke' }}>
								(
								{Array.isArray(option.unit)
									? option.unit.join(', ')
									: option.unit}
								)
							</Box>
						)}
					</Box>
				)}
			/>
			<IconButton
				size='small'
				color='primary'
				disabled={!inputValue.trim()}
				onClick={() => onAdd(inputValue.trim())}
				sx={{ zIndex: 500, position: 'absolute', right: 4 }}
				aria-label='Add ingredient'>
				<Plus size={15} />
			</IconButton>
		</Box>
	);
}

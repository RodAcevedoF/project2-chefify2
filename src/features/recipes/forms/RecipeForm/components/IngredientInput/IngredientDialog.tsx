import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Typography,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Box,
	useTheme,
} from '@mui/material';
import type { Ingredient } from '@/types/ingredient.type';
import { Units } from '@/types/ingredient.type';
import { theme } from '@/theme';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { ButtonVariants } from '@/types/common.types';

interface Props {
	open: boolean;
	isCreatingNew: boolean;
	newIngredientName: string;
	selectedIngredient?: Ingredient | null;
	selectedUnit: string;
	quantity: string;
	onClose: () => void;
	setSelectedUnit: (v: string) => void;
	setQuantity: (v: string) => void;
	onConfirm: () => void;
}

export default function AddIngredientDialog(props: Props) {
	const {
		open,
		isCreatingNew,
		newIngredientName,
		selectedIngredient,
		selectedUnit,
		quantity,
		onClose,
		setSelectedUnit,
		setQuantity,
		onConfirm,
	} = props;

	const t = useTheme();

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth='sm'
			fullWidth
			slotProps={{
				paper: {
					sx: {
						borderRadius: 8,
						background: t.palette.success.selected,
						padding: 2,
					},
				},
			}}>
			<DialogTitle sx={{ fontFamily: 'Alegreya', fontSize: 24 }}>
				{isCreatingNew
					? `Create new: "${newIngredientName}"`
					: `Add: ${selectedIngredient?.name}`}
			</DialogTitle>
			<DialogContent sx={{ pt: 2 }}>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					{isCreatingNew && (
						<>
							<Typography variant='body1' color='primary'>
								Select unit for "{newIngredientName}":
							</Typography>
							<FormControl fullWidth>
								<InputLabel sx={{ color: theme.palette.primary.main }}>
									Unit
								</InputLabel>
								<Select
									value={selectedUnit}
									label='Unit'
									onChange={(e) => setSelectedUnit(e.target.value)}
									sx={{
										color: theme.palette.primary.main,
										'& .MuiOutlinedInput-notchedOutline': {
											borderColor: theme.palette.primary.main,
										},
										'&:hover': {
											'MuiOutlinedInput-notchedOutline': {
												borderColor: theme.palette.primary.main,
											},
											'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
												borderColor: theme.palette.primary.main,
											},
										},
									}}>
									{Units.options.map((unit) => (
										<MenuItem
											key={unit}
											value={unit}
											sx={{
												color: theme.palette.primary.main,
											}}>
											{unit}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</>
					)}
					{selectedIngredient && !isCreatingNew && (
						<Typography variant='body2' color='primary'>
							Unit:{' '}
							{Array.isArray(selectedIngredient.unit)
								? selectedIngredient.unit.join(', ')
								: selectedIngredient.unit}
						</Typography>
					)}
					<TextField
						label='Quantity'
						type='number'
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
						fullWidth
						slotProps={{
							input: {
								inputProps: { min: 0, step: 1 },
							},
						}}
					/>
				</Box>
			</DialogContent>
			<DialogActions>
				<ButtonUsage
					label='Cancel'
					parentMethod={onClose}
					variant={ButtonVariants.CANCEL}
				/>
				<ButtonUsage
					label={isCreatingNew ? 'Create and add' : 'Add'}
					parentMethod={onConfirm}
					variant={ButtonVariants.DEFAULT}
					disabled={!quantity || parseFloat(quantity) <= 0}
				/>
			</DialogActions>
		</Dialog>
	);
}

import {
	Box,
	Chip,
	IconButton,
	Paper,
	TextField,
	Autocomplete,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography,
	Snackbar,
	Alert,
} from '@mui/material';
import { Plus } from 'lucide-react';
import {
	Controller,
	type Control,
	type ControllerRenderProps,
} from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import { useGetIngredients } from '@/features/ingredients/hooks/useGetIngredient';
import { useCreateIngredient } from '@/features/ingredients/hooks/useCreateIngredient';
import {
	Units,
	type Ingredient,
	type IngredientRefDTO,
} from '@/types/ingredient.type';
import { theme } from '@/theme';

export interface IngredientsInputProps {
	control: Control;
	color: string;
	backgroundColor: string;
	inputValue: string;
	setInputValue: (value: string) => void;
	name: string;
}

const IngredientsInput = (props: IngredientsInputProps) => {
	const [searchTerm, setSearchTerm] = useState('');
	const fieldRef = useRef<ControllerRenderProps | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedIngredient, setSelectedIngredient] =
		useState<Ingredient | null>(null);
	const [isCreatingNew, setIsCreatingNew] = useState(false);
	const [newIngredientName, setNewIngredientName] = useState('');
	const [selectedUnit, setSelectedUnit] = useState<string>(Units.options[0]);
	const [quantity, setQuantity] = useState<string>('1');

	// Estado para el Snackbar
	const [snackbar, setSnackbar] = useState<{
		open: boolean;
		message: string;
		severity: 'success' | 'info' | 'warning' | 'error';
	}>({ open: false, message: '', severity: 'info' });
	const closeSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

	useEffect(() => {
		const id = setTimeout(() => setSearchTerm(props.inputValue.trim()), 300);
		return () => clearTimeout(id);
	}, [props.inputValue]);

	const { data: options = [], refetch } = useGetIngredients(
		{ name: searchTerm },
		{
			enabled: !!searchTerm && searchTerm.length >= 2,
			queryKey: ['ingredients', searchTerm],
		},
	);

	const createIngredientMutation = useCreateIngredient({
		onSuccess: () => {
			refetch();
		},
	});

	const openModalForExisting = (
		ingredient: Ingredient,
		field: ControllerRenderProps,
	) => {
		const current = Array.isArray(field.value) ? field.value : [];
		const exists = current.some(
			(item: IngredientRefDTO) => item.ingredient?._id === ingredient._id,
		);

		if (exists) {
			setSnackbar({
				open: true,
				message: 'Ingrediente ya agregado',
				severity: 'info',
			});
			return; // No abrir modal si ya existe
		}

		setSelectedIngredient(ingredient);
		setIsCreatingNew(false);
		setQuantity('1');
		fieldRef.current = field;
		setModalOpen(true);
	};

	const openModalForNew = (name: string, field: ControllerRenderProps) => {
		setNewIngredientName(name);
		setIsCreatingNew(true);
		setSelectedUnit(Units.options[0]);
		setQuantity('1');
		fieldRef.current = field;
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setSelectedIngredient(null);
		setIsCreatingNew(false);
		setNewIngredientName('');
		setQuantity('1');
		fieldRef.current = null;
	};

	const handleAdd = async (value: string, field: ControllerRenderProps) => {
		if (!value.trim()) return;
		const ingredient = options.find(
			(opt) => opt.name.toLowerCase() === value.toLowerCase(),
		);

		if (!ingredient) {
			openModalForNew(value.trim(), field);
		} else {
			openModalForExisting(ingredient, field);
		}
	};

	const addIngredientWithQuantity = (
		ingredient: Ingredient,
		field: ControllerRenderProps,
	) => {
		const current = Array.isArray(field.value) ? field.value : [];
		const exists = current.some(
			(item: IngredientRefDTO) => item.ingredient?._id === ingredient._id,
		);

		if (exists) {
			setSnackbar({
				open: true,
				message: 'Ingrediente ya agregado',
				severity: 'info',
			});
			closeModal(); // Cerrar modal si estaba abierto
			return;
		}

		const quantityNum = parseFloat(quantity);
		if (isNaN(quantityNum) || quantityNum <= 0) {
			setSnackbar({
				open: true,
				message: 'Ingresa una cantidad válida',
				severity: 'warning',
			});
			closeModal(); // Cerrar modal también aquí para consistencia
			return;
		}

		const ingredientRef: IngredientRefDTO = {
			_id: `temp_${Date.now()}`, // ID temporal para el frontend
			ingredient: ingredient,
			quantity: quantityNum,
		};

		field.onChange([...current, ingredientRef]);
		props.setInputValue('');
		closeModal();
	};
	const handleConfirmAdd = async () => {
		if (!fieldRef.current) return;

		if (isCreatingNew) {
			try {
				const payload = {
					name: newIngredientName.trim(),
					unit: selectedUnit as (typeof Units.options)[number],
				};

				await createIngredientMutation.mutateAsync(payload);

				const refetchResult = await refetch();
				const updatedOptions: Ingredient[] = refetchResult?.data ?? [];

				const ingredient = updatedOptions.find(
					(opt) =>
						opt.name.toLowerCase() === newIngredientName.trim().toLowerCase(),
				);

				if (ingredient) {
					addIngredientWithQuantity(ingredient, fieldRef.current);
					setSnackbar({
						open: true,
						message: 'Ingrediente creado y agregado',
						severity: 'success',
					});
				} else {
					setSnackbar({
						open: true,
						message:
							'Ingrediente creado, pero no se pudo agregar inmediatamente',
						severity: 'info',
					});
				}

				closeModal();
			} catch (error) {
				console.error('Error creating ingredient:', error);
				setSnackbar({
					open: true,
					message: 'Error al crear el ingrediente',
					severity: 'error',
				});
			}
		} else if (selectedIngredient) {
			addIngredientWithQuantity(selectedIngredient, fieldRef.current);
			closeModal();
		}
	};

	return (
		<>
			<Controller
				control={props.control}
				name={props.name}
				render={({ field }) => (
					<Paper
						sx={{
							p: 0,
							width: '100%',
							backgroundColor: props.backgroundColor,
							boxShadow: 'none',
							height: 'fit-content',
							display: 'flex',
							justifyContent: 'center',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 1,
						}}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 1,
								position: 'relative',
								width: '100%',
							}}>
							<Autocomplete
								freeSolo
								options={options || []}
								sx={{ width: '100%' }}
								disableClearable
								getOptionLabel={(option) => {
									if (!option) return '';
									return typeof option === 'string'
										? option
										: option.name || '';
								}}
								inputValue={props.inputValue || ''}
								onInputChange={(_, v) => props.setInputValue(v || '')}
								onChange={(_, value) => {
									if (!value) return;
									const name = typeof value === 'string' ? value : value.name;
									if (name) handleAdd(name, field);
								}}
								loading={createIngredientMutation.isPending}
								noOptionsText={
									searchTerm.length < 2
										? 'Ingresa al menos 2 caracteres'
										: 'No se encontraron ingredientes'
								}
								renderInput={(params) => (
									<TextField
										{...params}
										placeholder='Add ingredient...'
										size='small'
										fullWidth
										sx={{
											minWidth: '100%',
											'& .MuiOutlinedInput-input::placeholder': {
												color: props.color,
												opacity: 1,
											},
											'& .MuiOutlinedInput-input': {
												paddingRight: '40px',
											},
										}}
									/>
								)}
								renderOption={(optionProps, option) => {
									if (!option) return null;
									return (
										<Box
											component='li'
											{...optionProps}
											key={option._id || option.name}
											sx={{ color: theme.palette.primary.main }}>
											{typeof option === 'string' ? option : option.name}
											{typeof option !== 'string' && option.unit && (
												<Box
													component='span'
													sx={{
														ml: 1,
														fontSize: '0.8em',
														color: 'whitesmoke',
													}}>
													(
													{Array.isArray(option.unit)
														? option.unit.join(', ')
														: option.unit}
													)
												</Box>
											)}
										</Box>
									);
								}}
							/>
							<IconButton
								size='small'
								color='primary'
								disabled={
									!props.inputValue.trim() || createIngredientMutation.isPending
								}
								onClick={() => {
									const name = props.inputValue.trim();
									if (name) handleAdd(name, field);
								}}
								sx={{ zIndex: 500, position: 'absolute', right: 4 }}
								aria-label='Add ingredient'>
								<Plus size={15} />
							</IconButton>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexWrap: 'wrap',
								gap: 1,
								pr: 1,
								width: '100%',
							}}>
							{Array.isArray(field.value) &&
								field.value
									.filter(
										(ing): ing is IngredientRefDTO =>
											typeof ing === 'object' && !!ing.ingredient && !!ing._id,
									)
									.map((ingRef, idx) => (
										<Chip
											key={ingRef._id || idx}
											label={`${ingRef.quantity} ${
												ingRef.ingredient.unit?.[0] || ''
											} ${ingRef.ingredient.name}`}
											onDelete={() => {
												const newValue = Array.isArray(field.value)
													? field.value.filter((_, i) => i !== idx)
													: [];
												field.onChange(newValue);
											}}
											color='primary'
											variant='outlined'
											size='small'
											sx={{ maxWidth: '250px' }}
										/>
									))}
						</Box>
					</Paper>
				)}
			/>

			{/* Modal para agregar ingredientes */}
			<Dialog open={modalOpen} onClose={closeModal} maxWidth='sm' fullWidth>
				<DialogTitle>
					{isCreatingNew
						? `Create new: "${newIngredientName}"`
						: `Add: ${selectedIngredient?.name}`}
				</DialogTitle>
				<DialogContent sx={{ pt: 2 }}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
						}}>
						{isCreatingNew && (
							<>
								<Typography variant='body2' color='primary'>
									Selecct unit for "{newIngredientName}":
								</Typography>
								<FormControl fullWidth>
									<InputLabel sx={{ color: theme.palette.primary.main }}>
										Unit
									</InputLabel>
									<Select
										value={selectedUnit}
										label='Unit'
										sx={{
											color: theme.palette.primary.main,
											'& .MuiOutlinedInput-notchedOutline': {
												borderColor: theme.palette.primary.main,
											},
											'&:hover .MuiOutlinedInput-notchedOutline': {
												borderColor: theme.palette.primary.main,
											},
											'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
												borderColor: theme.palette.primary.main,
											},
										}}
										onChange={(e) => setSelectedUnit(e.target.value)}>
										{Units.options.map((unit) => (
											<MenuItem
												key={unit}
												value={unit}
												sx={{ color: theme.palette.primary.main }}>
												{unit}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</>
						)}

						{selectedIngredient && !isCreatingNew && (
							<Typography variant='body2' color='primary'>
								Unidad:{' '}
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
							inputProps={{ min: 0, step: 0.1 }}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeModal}>Cancelar</Button>
					<Button
						onClick={handleConfirmAdd}
						variant='contained'
						disabled={!quantity || parseFloat(quantity) <= 0}>
						{isCreatingNew ? 'Crear y agregar' : 'Agregar'}
					</Button>
				</DialogActions>
			</Dialog>

			{/* Snackbar para notificaciones */}
			<Snackbar
				open={snackbar.open}
				autoHideDuration={4000}
				onClose={(event, reason) => {
					if (reason !== 'clickaway') closeSnackbar();
				}}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
				<Alert
					onClose={closeSnackbar}
					severity={snackbar.severity}
					sx={{ width: '100%' }}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</>
	);
};

export default IngredientsInput;
